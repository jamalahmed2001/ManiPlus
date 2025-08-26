#!/usr/bin/env node

/**
 * Simple script to validate RSS feeds
 * Run with: node scripts/validate-feeds.js
 */

import { generateRSSFeed, generateAtomFeed, generateJSONFeed } from '../src/utils/rss'
import { episodes } from '../src/data/episodes'

console.log('🔍 Validating RSS Feeds...\n')

try {
  // Test RSS 2.0 Feed
  console.log('📡 Testing RSS 2.0 Feed...')
  const rssFeed = generateRSSFeed(episodes)
  if (rssFeed.includes('<?xml version="1.0"') && rssFeed.includes('<rss version="2.0"')) {
    console.log('✅ RSS 2.0 Feed: Valid XML structure')
  } else {
    console.log('❌ RSS 2.0 Feed: Invalid XML structure')
  }

  // Test Atom Feed
  console.log('⚛️  Testing Atom Feed...')
  const atomFeed = generateAtomFeed(episodes)
  if (atomFeed.includes('<?xml version="1.0"') && atomFeed.includes('<feed xmlns="http://www.w3.org/2005/Atom"')) {
    console.log('✅ Atom Feed: Valid XML structure')
  } else {
    console.log('❌ Atom Feed: Invalid XML structure')
  }

  // Test JSON Feed
  console.log('📋 Testing JSON Feed...')
  const jsonFeed = generateJSONFeed(episodes)
  if (jsonFeed.version && jsonFeed.title && Array.isArray(jsonFeed.items)) {
    console.log('✅ JSON Feed: Valid JSON structure')
  } else {
    console.log('❌ JSON Feed: Invalid JSON structure')
  }

  // Validate episode content
  console.log('\n📊 Episode Statistics:')
  console.log(`- Total Episodes: ${episodes.length}`)
  console.log(`- RSS Items: ${(rssFeed.match(/<item>/g) || []).length}`)
  console.log(`- Atom Entries: ${(atomFeed.match(/<entry>/g) || []).length}`)
  console.log(`- JSON Items: ${jsonFeed.items?.length || 0}`)

  console.log('\n🎉 Feed validation completed!')
  console.log('\nTo test feeds manually:')
  console.log('- RSS: http://localhost:3000/api/feed.xml')
  console.log('- Atom: http://localhost:3000/api/atom.xml') 
  console.log('- JSON: http://localhost:3000/api/feed.json')

} catch (error) {
  console.error('❌ Feed validation failed:', error.message)
  process.exit(1)
}
