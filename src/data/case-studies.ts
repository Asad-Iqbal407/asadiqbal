import type { ProjectSlug } from './project-slugs';

export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  /** Meta description, aim for <= 160 characters. */
  description: string;
  /** Short label used on cards. */
  kicker: string;
  project: ProjectSlug;
  intro: string;
  sections: CaseStudySection[];
  stack: string[];
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
};

// NOTE: These write-ups are based on reading the public source code of each
// project. TODO(asad): add your own perspective (why you made each choice,
// what was hard, what you learned) and any real results you can verify.
export const caseStudies: CaseStudy[] = [
  {
    slug: 'role-based-lms-nextjs',
    title: 'Building a role-based LMS with Next.js, NextAuth and MongoDB',
    description:
      'How I built a learning management system with separate student, teacher and admin areas using the Next.js App Router, NextAuth, Mongoose and Zod.',
    kicker: 'Full stack · Next.js · MongoDB',
    project: 'lms-platform',
    intro:
      'This case study walks through the University of Gujrat LMS: a full stack Next.js application where students, teachers and administrators each get their own workspace. It covers how authentication and authorisation are layered, how the data is modelled, and the tooling that keeps development fast.',
    sections: [
      {
        heading: 'What the system needs to do',
        paragraphs: [
          'A learning management system is mostly a question of who is allowed to do what. The LMS has three roles with clearly different responsibilities.',
        ],
        bullets: [
          'Students register themselves, browse the courses that are currently offered, enrol, and see their assignments. A grades view is in place, ready for when grading is built.',
          'Teachers manage their own courses and publish assignments for them. The courses API also lets teachers create courses, which are assigned to them automatically.',
          'Admins manage users and courses, including creating courses, choosing the teacher and switching a course on or off, and have a settings area.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'The app uses the Next.js App Router with route groups. An (auth) group holds the login and registration pages, and an (app) group holds the signed-in experience, split into admin, teacher and student sections. Each section has its own layout, which defines that role\'s navigation.',
          'Server-side logic lives in route handlers under /api for courses, enrolment, assignments, registration, admin user management and a health check. A small server folder holds the database connection, environment validation and the four Mongoose models: User, Course, Enrollment and Assignment.',
          'The database helper caches the Mongoose connection on the global object and retries once if the first attempt fails. This matters on serverless hosting, where each invocation could otherwise open a new connection to MongoDB.',
        ],
      },
      {
        heading: 'Authentication and authorisation',
        paragraphs: [
          'Sign-in uses NextAuth with the credentials provider and JWT sessions, so no session table is needed. Incoming credentials are validated with Zod, the password is checked with bcrypt, and the user\'s id and role are copied into the token and then exposed on the session object.',
          'Authorisation is enforced in two places. The page layouts redirect anyone who is signed out to the login page, and redirect users with the wrong role to their dashboard. The API handlers then check the role again, so calling an endpoint directly does not bypass the interface. The enrolment endpoint, for example, returns 401 for anonymous callers and 403 for anyone who is not a student.',
          'Registration is deliberately limited. The Zod schema requires a name, a valid email and a password of at least eight characters, hashes it with bcrypt, and always creates the account with the student role. Teacher and admin accounts cannot be created through public sign-up; they are created by an admin or by the seed script.',
        ],
      },
      {
        heading: 'Data modelling decisions',
        bullets: [
          'Course codes are required, unique and stored uppercase, so duplicates such as "cs101" and "CS101" cannot coexist.',
          'Each course has an isOffered flag, so an admin can take a course out of the catalogue without deleting it or its enrolments. The enrolment endpoint rejects courses that are not currently offered with a 409 response.',
          'Enrolments have a compound unique index on course and student, and are written with an upsert that only sets fields on insert. Enrolling twice, for example through a double click, is therefore harmless and cannot create duplicates.',
          'Assignments are indexed by course and creation date (newest first), which matches how teachers and students list them.',
        ],
      },
      {
        heading: 'Tooling for faster development',
        paragraphs: [
          'Three seed commands create an initial admin, a sample teacher with sample courses, and a larger demo dataset, so the app can be explored without entering data by hand. A smoke script creates a test student, enrols them in an offered course and prints the result, which is a quick way to check that the database wiring and the enrolment model work. A health endpoint reports whether the database connection is working.',
        ],
      },
      {
        heading: 'Current status and next steps',
        paragraphs: [
          'Registration and sign-in, role-based dashboards, the course catalogue and enrolment, assignment creation and the admin tools for users and courses are in place. The submissions and grading interface is the next milestone: the teacher gradebook page currently points to assignment creation while that work is built.',
        ],
      },
    ],
    stack: [
      'Next.js 16 (App Router)',
      'React 19',
      'TypeScript',
      'MongoDB & Mongoose 9',
      'NextAuth 4',
      'Zod 4',
      'bcryptjs',
      'Tailwind CSS 4',
    ],
    publishedAt: '2026-10-10',
    updatedAt: '2026-10-10',
  },
  {
    slug: 'hand-tracking-archery-game',
    title: 'Building a hand-tracking 3D archery game with Three.js and MediaPipe',
    description:
      'How I built a browser archery game in Three.js with arrow physics, seasonal stages and webcam hand tracking that fires with a pinch gesture, using MediaPipe Hands.',
    kicker: 'Game dev · Three.js · Computer vision',
    project: 'archery-duck-hunter',
    intro:
      'Duck Hunter 3D is a browser archery game you can play with a mouse, with a tap on your phone, or with nothing but your hand in front of a webcam. This case study covers the arrow physics, the data-driven stage system, and how a pinch gesture became the fire button.',
    sections: [
      {
        heading: 'The idea and the constraints',
        paragraphs: [
          'The result is a 3D game that runs instantly in a browser and has a hands-free option. That shaped the technical choices: no build step, no installs, and three input methods that all feed the same game logic.',
          'The project is a single index.html page and a game.js module of roughly a thousand lines. Three.js (version r160) is loaded as an ES module through an import map, and MediaPipe Hands is loaded from a CDN, so the whole game can be hosted as static files.',
        ],
      },
      {
        heading: 'Game design: three seasons',
        paragraphs: [
          'The game has three stages, each themed on a season, defined in a configuration object. Cherry Blossom has a pink sky and falling petals, Golden Autumn has warm tones and falling leaves, and Crystal Glacier has a snowy ground with falling snow.',
        ],
        bullets: [
          'Each stage sets its own sky, fog, ground and light colours, a particle type, how fast the ducks fly, and how often new ducks spawn.',
          'Difficulty rises from stage to stage: duck speed goes from 3 to 5 to 7, and the spawn interval shortens from 2.5 seconds to 2.0 and then 1.5.',
          'To clear a stage you hit 10 ducks, and you get 25 arrows per stage to do it.',
          'A normal hit scores 100 points and a headshot scores 500, so aiming for the head is worth the risk.',
        ],
      },
      {
        heading: 'Architecture',
        paragraphs: [
          'The code is organised as small classes with one job each: a LevelManager that applies a stage configuration to the scene, a ParticleSystem for petals, leaves and snow, Duck and Arrow objects, a HandController for webcam input, and a Game class that owns the scene and the loop.',
          'Because stages are plain data, adding a new season means adding one configuration object. The LevelManager takes care of changing the background, fog, ground colour, lighting, particles and on-screen labels.',
        ],
      },
      {
        heading: 'Arrow physics and hit detection',
        paragraphs: [
          'Each arrow is built from simple geometry (a shaft, two crossed feathers and a cone tip) and launched in the direction the camera is facing. The game fires immediately at full power and then enforces a half-second reload, so a single click or a single pinch is enough to shoot. The configuration still contains draw-speed and minimum-power settings, a trace of a draw-and-release mechanic that was simplified so it would work with a pinch.',
          'Every frame the arrow is moved by its velocity, gravity pulls the velocity downwards at 9.8 units per second squared, and the arrow is rotated to face its direction of travel so it visibly arcs. Each shot also nudges the camera upwards slightly as recoil. An arrow that reaches the ground sticks there and is removed after a few seconds.',
          'Hit detection checks whether the arrow tip is inside a duck\'s bounding box, which keeps the cost low for an arcade feel. A hit is a headshot when the tip is above the duck\'s centre by a set margin, and the arrow then attaches to the duck so it stays stuck in it.',
        ],
      },
      {
        heading: 'Hand tracking with MediaPipe',
        paragraphs: [
          'In webcam mode, MediaPipe Hands tracks a single hand. The video is requested at a small resolution to keep the frame rate smooth, and a mirrored preview shows the detected hand landmarks so players can see what the game sees.',
          'Aiming is driven by the tip of the index finger. Its position in the camera frame is converted into a rotation of the game camera. The sensitivity was tuned down to roughly half of the first version, because a smaller mapping makes fine aiming much easier.',
          'Firing is a pinch. The game measures the distance between the thumb tip and the index fingertip and treats anything under a small threshold as a pinch. It fires only on the moment the pinch starts, using a flag that remembers whether the fingers were already pinched, so holding the pinch does not fire a stream of arrows.',
        ],
      },
      {
        heading: 'Mouse and mobile controls',
        paragraphs: [
          'The same game powers the other two modes. With a mouse, the game uses pointer lock so the player can keep turning without hitting the edge of the screen: mouse movement rotates the camera within limits, and a click fires an arrow.',
          'On phones the interaction is simpler. A tap is converted into a ray from the camera through the touch point, and if the ray hits a duck the closest one is counted as hit. In this mode the bow, crosshair and arrow counter are hidden, and the page disables pinch zoom so gestures do not fight the game.',
        ],
      },
      {
        heading: 'Limitations and what I would improve',
        bullets: [
          'Collision currently tests only the arrow tip at each frame. A fast arrow could pass through a thin target between two frames, so a swept test between the previous and current positions would be more reliable.',
          'The webcam mode needs camera permission and a secure (HTTPS) page, and loads MediaPipe from a CDN, so it needs a network connection.',
          'Hand-tracking accuracy depends on lighting and the camera. A short calibration step for the pinch threshold would help across different hands and cameras.',
        ],
      },
    ],
    stack: [
      'Three.js r160',
      'MediaPipe Hands',
      'JavaScript (ES modules)',
      'HTML & CSS',
      'Vercel static hosting',
    ],
    publishedAt: '2026-10-10',
    updatedAt: '2026-10-10',
  },
];

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);

export const getCaseStudyForProject = (project: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.project === project);
