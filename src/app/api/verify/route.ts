import { NextRequest, NextResponse } from 'next/server';
import { verifySolution, type Challenge, type Solution } from '../../../lib/proof-of-work';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { challenge, solution }: { challenge: Challenge; solution: Solution } = body;

    // Validate input
    if (!challenge || !solution) {
      return NextResponse.json(
        { error: 'Missing challenge or solution' },
        { status: 400 }
      );
    }

    // Check if challenge is not too old (5 minutes)
    const maxAge = 5 * 60 * 1000; // 5 minutes in milliseconds
    const challengeAge = Date.now() - challenge.timestamp;
    
    if (challengeAge > maxAge) {
      return NextResponse.json(
        { error: 'Challenge expired' },
        { status: 400 }
      );
    }

    // Verify the solution
    const isValid = verifySolution(challenge, solution);

    if (isValid) {
      // In a real application, you might:
      // - Store the successful verification in a database
      // - Generate a session token
      // - Set authentication cookies
      
      return NextResponse.json({
        success: true,
        message: 'Proof of work verified successfully',
        timestamp: Date.now()
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid proof of work solution' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to generate new challenges
export async function GET() {
  const { generateChallenge } = await import('../../../lib/proof-of-work');
  
  try {
    const challenge = generateChallenge(4); // Default difficulty
    
    return NextResponse.json({
      challenge,
      message: 'New challenge generated'
    });
  } catch (error) {
    console.error('Challenge generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate challenge' },
      { status: 500 }
    );
  }
} 