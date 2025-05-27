// Next.js App Router Example
// app/api/verify/route.ts
import { createVerificationEndpoint } from 'mayavi';

export const { POST } = createVerificationEndpoint();

// ===================================

// Next.js Pages Router Example
// pages/api/verify.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifySolution, type Challenge, type Solution } from 'mayavi';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { challenge, solution }: { challenge: Challenge; solution: Solution } = req.body;

  if (!challenge || !solution) {
    return res.status(400).json({ error: 'Missing challenge or solution' });
  }

  // Check if challenge is not too old (5 minutes)
  const maxAge = 5 * 60 * 1000;
  const challengeAge = Date.now() - challenge.timestamp;
  
  if (challengeAge > maxAge) {
    return res.status(400).json({ error: 'Challenge expired' });
  }

  // Verify the solution
  const isValid = verifySolution(challenge, solution);

  if (isValid) {
    res.json({
      success: true,
      message: 'Proof of work verified successfully',
      timestamp: Date.now()
    });
  } else {
    res.status(400).json({ error: 'Invalid proof of work solution' });
  }
}

// ===================================

// Express.js Example
import express from 'express';
import { verifySolution, type Challenge, type Solution } from 'mayavi';

const app = express();
app.use(express.json());

app.post('/api/verify', (req, res) => {
  const { challenge, solution }: { challenge: Challenge; solution: Solution } = req.body;

  if (!challenge || !solution) {
    return res.status(400).json({ error: 'Missing challenge or solution' });
  }

  // Check if challenge is not too old (5 minutes)
  const maxAge = 5 * 60 * 1000;
  const challengeAge = Date.now() - challenge.timestamp;
  
  if (challengeAge > maxAge) {
    return res.status(400).json({ error: 'Challenge expired' });
  }

  // Verify the solution
  const isValid = verifySolution(challenge, solution);

  if (isValid) {
    res.json({
      success: true,
      message: 'Proof of work verified successfully',
      timestamp: Date.now()
    });
  } else {
    res.status(400).json({ error: 'Invalid proof of work solution' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// ===================================

// Fastify Example
import Fastify from 'fastify';
import { verifySolution, type Challenge, type Solution } from 'mayavi';

const fastify = Fastify({ logger: true });

fastify.post('/api/verify', async (request, reply) => {
  const { challenge, solution } = request.body as { challenge: Challenge; solution: Solution };

  if (!challenge || !solution) {
    return reply.status(400).send({ error: 'Missing challenge or solution' });
  }

  // Check if challenge is not too old (5 minutes)
  const maxAge = 5 * 60 * 1000;
  const challengeAge = Date.now() - challenge.timestamp;
  
  if (challengeAge > maxAge) {
    return reply.status(400).send({ error: 'Challenge expired' });
  }

  // Verify the solution
  const isValid = verifySolution(challenge, solution);

  if (isValid) {
    return {
      success: true,
      message: 'Proof of work verified successfully',
      timestamp: Date.now()
    };
  } else {
    return reply.status(400).send({ error: 'Invalid proof of work solution' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();

// ===================================

// Deno Example
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { verifySolution, type Challenge, type Solution } from 'mayavi';

async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { challenge, solution }: { challenge: Challenge; solution: Solution } = await req.json();

  if (!challenge || !solution) {
    return new Response(JSON.stringify({ error: 'Missing challenge or solution' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check if challenge is not too old (5 minutes)
  const maxAge = 5 * 60 * 1000;
  const challengeAge = Date.now() - challenge.timestamp;
  
  if (challengeAge > maxAge) {
    return new Response(JSON.stringify({ error: 'Challenge expired' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Verify the solution
  const isValid = verifySolution(challenge, solution);

  if (isValid) {
    return new Response(JSON.stringify({
      success: true,
      message: 'Proof of work verified successfully',
      timestamp: Date.now()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } else {
    return new Response(JSON.stringify({ error: 'Invalid proof of work solution' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

serve(handler, { port: 3000 }); 