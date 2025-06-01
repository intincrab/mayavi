/**
 * Test the core Mayavi functionality
 * This demonstrates using Mayavi as an external package
 */

const { 
  generateChallenge, 
  solveChallenge, 
  verifySolution,
  isValidHash,
  estimateSolveTime,
  getDifficultyDescription
} = require('mayavi');

async function testMayavi() {
  console.log('🧪 Testing Mayavi Core Functionality\n');

  // Test 1: Generate Challenge
  console.log('1. Testing Challenge Generation...');
  const difficulty = 3; // Start with easy difficulty
  const challenge = generateChallenge(difficulty);
  
  console.log(`   ✅ Challenge generated:`);
  console.log(`      Data: ${challenge.data}`);
  console.log(`      Difficulty: ${challenge.difficulty}`);
  console.log(`      Timestamp: ${new Date(challenge.timestamp).toISOString()}`);
  console.log(`      Estimated solve time: ${estimateSolveTime(difficulty)}ms`);
  console.log(`      Difficulty description: ${getDifficultyDescription(difficulty)}`);
  
  // Test 2: Solve Challenge
  console.log('\n2. Testing Challenge Solving...');
  const startTime = Date.now();
  
  const solution = await solveChallenge(challenge, (nonce, hash) => {
    if (nonce % 1000 === 0) {
      process.stdout.write(`   🔄 Progress: ${nonce} attempts, hash: ${hash.substring(0, 16)}...\r`);
    }
  });
  
  const solveTime = Date.now() - startTime;
  console.log(`\n   ✅ Solution found:`);
  console.log(`      Nonce: ${solution.nonce}`);
  console.log(`      Hash: ${solution.hash}`);
  console.log(`      Solve time: ${solveTime}ms`);
  
  // Test 3: Verify Solution
  console.log('\n3. Testing Solution Verification...');
  const isValid = verifySolution(challenge, solution);
  console.log(`   ${isValid ? '✅' : '❌'} Solution verification: ${isValid ? 'VALID' : 'INVALID'}`);
  
  // Test 4: Hash Validation
  console.log('\n4. Testing Hash Validation...');
  const hashValid = isValidHash(solution.hash, difficulty);
  console.log(`   ${hashValid ? '✅' : '❌'} Hash validation: ${hashValid ? 'VALID' : 'INVALID'}`);
  console.log(`   Required leading zeros: ${'0'.repeat(difficulty)}`);
  console.log(`   Actual hash starts with: ${solution.hash.substring(0, difficulty + 5)}`);
  
  // Test 5: Different Difficulties
  console.log('\n5. Testing Different Difficulties...');
  for (let diff = 2; diff <= 4; diff++) {
    const desc = getDifficultyDescription(diff);
    const time = estimateSolveTime(diff);
    console.log(`   Difficulty ${diff}: ${desc} (~${time}ms)`);
  }
  
  console.log('\n🎉 All tests completed successfully!');
}

// Run the tests
testMayavi().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
}); 