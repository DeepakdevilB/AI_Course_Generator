/**
 * AI Course Generator - Video Scoring Engine
 * This module calculates a definitive quality score for a given video.
 */

// 1. Transcript Semantic Density
// In production, send the transcript to an LLM or use embeddings. 
// Here is a frequency-based fallback approach.
function calculateSemanticDensity(transcript, targetKeywords) {
    if (!transcript) return 0;
    
    const words = transcript.toLowerCase().split(/\W+/);
    const totalWords = words.length;
    if (totalWords === 0) return 0;

    let keywordHits = 0;
    const lowerKeywords = targetKeywords.map(k => k.toLowerCase());

    words.forEach(word => {
        if (lowerKeywords.includes(word)) {
            keywordHits++;
        }
    });

    // Calculate density (hits per 1000 words). 
    // Assume 15 hits per 1000 words is a "perfect" 100 score for deep focus.
    const densityPer1000 = (keywordHits / totalWords) * 1000;
    return Math.min((densityPer1000 / 15) * 100, 100);
}

// 2. Engagement-to-View Ratio
function calculateEngagementScore(likes, views) {
    if (views === 0) return 0;
    
    const ratio = (likes / views) * 100;
    
    // A 10% ratio is exceptional. We'll cap the score at 10% to prevent outliers.
    // This returns a score out of 100.
    const normalizedScore = Math.min((ratio / 10) * 100, 100); 
    return normalizedScore;
}


/**
 * Cleans an array of comments by removing likely spam, bots, and low-signal text.
 */
function filterSpamComments(comments) {
    if (!comments || comments.length === 0) return [];

    // Common words used by YouTube spam bots
    const spamKeywords = [
        'whatsapp', 'telegram', 'crypto', 'invest', 'bitcoin', 'binance', 'ethereum',
        'contact me', 'subscribe to my channel', 'click the link', 'profile picture',
        'financial advisor', 'profit', 'trading bot'
    ];

    // Regex to detect standard URLs and naked domain links
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.[a-z]{2,3}(\/[^\s]*)?)/gi;
    
    // Regex to detect excessive character repetition (e.g., "awesoooommmmeeee" or random bot spam)
    const repetitiveCharRegex = /(.)\1{4,}/;

    return comments.filter(comment => {
        const lowerComment = comment.toLowerCase();

        // 1. URL Check: Bots frequently post malicious or promotional links
        if (urlRegex.test(comment)) return false;

        // 2. Keyword Check: Instantly drop cryptocurrency and contact scams
        for (let i = 0; i < spamKeywords.length; i++) {
            if (lowerComment.includes(spamKeywords[i])) {
                return false; 
            }
        }

        // 3. Length Check: Drop comments that are too short to offer educational sentiment (e.g., "ok", "hi")
        if (comment.trim().length < 5) return false;

        // 4. Repetition Check: Drop comments with 5 or more identical consecutive characters
        if (repetitiveCharRegex.test(lowerComment)) return false;

        // If it survives all checks, it's likely a legitimate comment
        return true; 
    });
}


// 3. Comment Sentiment Score
// In production, use `npm install sentiment` or an LLM.
function calculateSentimentScore(comments) {
    if (!comments || comments.length === 0) return 50; // Neutral baseline

    const positiveWords = ['best', 'saved', 'finally', 'amazing', 'thanks', 'understood', 'clear'];
    const negativeWords = ['confusing', 'wrong', 'error', 'terrible', 'worst', 'unclear', 'deprecated'];

    let score = 50; // Start neutral

    comments.forEach(comment => {
        const lowerComment = comment.toLowerCase();
        positiveWords.forEach(word => { if (lowerComment.includes(word)) score += 5; });
        negativeWords.forEach(word => { if (lowerComment.includes(word)) score -= 8; }); // Penalize negative harder
    });

    return Math.max(0, Math.min(score, 100)); // Clamp between 0 and 100
}

// 4. Structural Metadata (Presence of Chapters)
function checkForChapters(description) {
    // Regex looks for timestamps like 00:00, 01:23, 10:45
    const timestampRegex = /(?:[0-5]?\d):(?:[0-5]\d)/g;
    const matches = description.match(timestampRegex);
    
    // If there are 3 or more timestamps, we assume it has chapters
    if (matches && matches.length >= 3) {
        return 100; // Has chapters
    }
    return 0; // No chapters
}

// 5. Channel Niche Authority
function calculateNicheAuthority(channelTags, courseDomainTags) {
    if (!channelTags || channelTags.length === 0) return 20; // Low authority if no data

    let matchCount = 0;
    const lowerDomainTags = courseDomainTags.map(tag => tag.toLowerCase());

    channelTags.forEach(tag => {
        if (lowerDomainTags.includes(tag.toLowerCase())) {
            matchCount++;
        }
    });

    // If 30% or more of channel tags match the course domain, it's highly authoritative
    const matchPercentage = matchCount / channelTags.length;
    return Math.min((matchPercentage / 0.3) * 100, 100);
}

// 6. The "Evergreen vs. Freshness" Weighting
function calculateFreshnessMultiplier(publishedAt, isEvergreenTopic) {
    const publishDate = new Date(publishedAt);
    const currentDate = new Date();
    const monthsOld = (currentDate.getFullYear() - publishDate.getFullYear()) * 12 + (currentDate.getMonth() - publishDate.getMonth());

    if (isEvergreenTopic) {
        // For DSA/Math: Very slow decay. Even 5-year-old (60 months) videos are fine.
        if (monthsOld <= 72) return 1.0; 
        return Math.max(0.7, 1 - ((monthsOld - 72) * 0.01)); // Slight penalty after 6 years
    } else {
        // For Frameworks (React, Next.js): Fast decay.
        if (monthsOld <= 12) return 1.0; // Perfect within 1 year
        if (monthsOld <= 24) return 0.8; // Okay within 2 years
        if (monthsOld <= 36) return 0.4; // Risky within 3 years
        return 0.1; // Highly penalized if older than 3 years
    }
}

/**
 * MASTER SCORING FUNCTION
 * Combines all parameters with specific weights to output a final rankable score.
 */
function rankVideo(videoData, searchContext) {
    // 1. Calculate individual scores (all out of 100)
    const engagementScore = calculateEngagementScore(videoData.likes, videoData.views);
    const semanticScore = calculateSemanticDensity(videoData.transcript, searchContext.targetKeywords);
    const sentimentScore = calculateSentimentScore(videoData.comments);
    const chapterScore = checkForChapters(videoData.description);
    const authorityScore = calculateNicheAuthority(videoData.channelTags, searchContext.domainTags);
    
    // 2. Apply Freshness Multiplier (0.1 to 1.0)
    const freshnessMultiplier = calculateFreshnessMultiplier(videoData.publishedAt, searchContext.isEvergreen);

    // 3. Define Weights (Must sum to 1.0)
    // You can tweak these based on what is most important to your generator
    const weights = {
        engagement: 0.30,  // 30%
        semantic: 0.25,    // 25%
        sentiment: 0.20,   // 20%
        chapters: 0.10,    // 10%
        authority: 0.15    // 15%
    };

    // 4. Calculate Base Score
    const baseScore = (
        (engagementScore * weights.engagement) +
        (semanticScore * weights.semantic) +
        (sentimentScore * weights.sentiment) +
        (chapterScore * weights.chapters) +
        (authorityScore * weights.authority)
    );

    // 5. Apply Time Decay and Return Final Score
    const finalScore = baseScore * freshnessMultiplier;
    
    return {
        videoId: videoData.id,
        finalScore: Math.round(finalScore * 100) / 100, // Round to 2 decimals
        breakdown: {
            engagementScore,
            semanticScore,
            sentimentScore,
            chapterScore,
            authorityScore,
            freshnessMultiplier
        }
    };
}

// ==========================================
// EXAMPLE USAGE:
// ==========================================

const mockVideo = {
    id: "v123abc",
    views: 150000,
    likes: 12000,
    publishedAt: "2022-05-10T00:00:00Z",
    description: "Learn Node.js routing. \n 00:00 Intro \n 02:30 Setup \n 15:00 Express Router",
    transcript: "Welcome to this tutorial on node.js and express. Today we will build a backend router...",
    comments: ["Best explanation of express routing!", "Clear and easy to follow, thanks.", "Awesome video"],
    channelTags: ["javascript", "node.js", "backend", "express", "web development"]
};

const searchContext = {
    targetKeywords: ["node", "express", "router", "backend"],
    domainTags: ["backend", "javascript", "node.js"],
    isEvergreen: false // Node.js updates frequently, so it's not evergreen
};

const result = rankVideo(mockVideo, searchContext);
console.log(result);