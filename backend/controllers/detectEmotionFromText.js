const express = require('express')

const emotionMap = {
    happy: ["happy", "excited", "joy", "cheerful", "delighted", "glad"],
    sad: ["sad", "depressed", "lonely", "unhappy", "down", "cry"],
    angry: ["angry", "mad", "furious", "irritated", "annoyed"],
    fear: ["scared", "afraid", "terrified", "nervous", "anxious"],
    surprised: ["surprised", "shocked", "amazed", "astonished"],
    love: ["love", "loving", "caring", "affection", "romantic"],
    neutral: []
  };


const emotionController = async (req , res) => {
    const feeling = req.body.text;

    try {
        if(!feeling) {
            return res.status(400).json({message : "please type what you're feeling"})
        }

        const actualFeeling = detectEmotion(feeling);
        res.status(200).json({emotion: actualFeeling})
    } catch(e) {
        res.status(400).json({ message : e.message})
    }
}

function detectEmotion(text) {
    text = text.toLowerCase();
  
    for (let emotion in emotionMap) {
      for (let word of emotionMap[emotion]) {
        if (text.includes(word)) {
          return emotion;
        }
      }
    }
  
    return "neutral";
}

module.exports = { emotionController };
