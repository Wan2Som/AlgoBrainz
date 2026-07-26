# AlgoBrainz 🚀

**[Live Demo](https://algo-brainz.vercel.app)** | **[GitHub Repository](https://github.com/Wan2Som/AlgoBrainz)**

AlgoBrainz is an interactive matchmaking platform designed to connect startups with prospective investors. Beyond its practical use case, the application serves as a functional demonstration of data structures, algorithm analysis, and real-time database synchronization. 

### Project Overview
The core objective of this project is to showcase how underlying data structures affect application performance. Users can filter through a database of investor entities based on industry focus and minimum funding ticket size. When executing a search, the application allows users to choose between two distinct algorithms:
*   **Linear Search:** Runs a sequential check across the database, demonstrating an $O(N)$ time complexity.
*   **Binary Search Tree (BST):** Utilizes a balanced tree structure for optimized range queries, demonstrating an $O(\log N + K)$ time complexity.

To make the theoretical performance differences visible to the user, artificial execution delays are implemented, allowing for a clear visual comparison of how each algorithm handles the data retrieval process.

### Features & Data Flow
Once a search is completed, the application utilizes Firebase's real-time `onSnapshot` listeners to manage state. When a user clicks "Sync Matches to Profile," the selected investor data and industry preferences are written to the database. The Profile Dashboard listens for these changes and updates instantly without requiring a page refresh. 

Additionally, the dashboard dynamically renders a curated Market Intelligence Wire. This feed automatically adjusts to display news articles relevant to the specific industry sector (e.g., FinTech, HealthTech, SaaS) the user just searched for.

### Technology Stack
*   **Frontend Environment:** Next.js (App Router) and React
*   **Interface & Styling:** Tailwind CSS
*   **Database:** Firebase Firestore
*   **Authentication:** Firebase Authentication
*   **Deployment & Hosting:** Vercel

### Evaluator / User Guide
To fully test the application's functionality, follow these steps:
1.  **Onboarding:** Create an account and complete the initial startup intake form to generate a baseline profile.
2.  **Algorithm Testing:** Navigate to the **Investor Directory**. Select an industry and input a target funding amount. Run the search first using Linear Search, then switch to the Binary Search Tree to observe the execution speed difference.
3.  **Real-Time Sync:** Click *Sync Matches to Profile*.
4.  **Dashboard Verification:** Return to the **Profile** tab. The UI will have instantly updated to display the saved investor matches, updated metric counters, and the newly tailored industry news feed.

### Local Installation
To run this project locally, clone the repository and install the required dependencies:

```bash
git clone [https://github.com/Wan2Som/AlgoBrainz.git](https://github.com/Wan2Som/AlgoBrainz.git)
cd AlgoBrainz
npm install
```

Create a `.env.local` file in the root directory and configure your Firebase environment variables to enable authentication and database reads/writes:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Finally, start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000.
