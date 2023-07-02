<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/idnzozkan/quonim/assets/59365742/1b6c2b17-be62-41ca-b110-ac6749a5eaff" alt="Logo" >
  </a>

  <h2 align="center">Quonim - Anonymous Q&A Network</h3>

  <p align="center">
    Join Quonim now and receive anonymous feedback or ask questions about any topic that sparks your interest.
    <br />
    <a href="https://quonim.vercel.app/">Visit Quonim</a>
    ·
    <a href="https://github.com/idnzozkan/quonim/issues">Report Bug</a>
    ·
    <a href="https://github.com/idnzozkan/quonim/issues">Request Feature</a>
  </p>
</div>

## Introduction

| ℹ️ Quonim is currently in beta. User accounts and content may be subject to removal during this testing phase. |
| :------------------------------------------------------------------------------------------------------------- |

`Quonim` is a social network where users can freely ask questions, share opinions, and give feedback without the need to disclose their identities. It serves as a valuable resource for individuals seeking honest feedback, enabling them to receive unbiased perspectives from a diverse community. Whether it's gaining insights on personal growth, professional development, or simply satisfying curiosity, Quonim empowers users to explore their questions without fear of judgment or social barriers.

In the current version of Quonim, ***even the platform owner cannot access*** the identities of those who ask questions. It's important to note that while this is the existing behavior, future updates may change this to address legal considerations and maintain a respectful environment by blocking inappropriate users. In case of such changes, this paragraph will no longer appear in the readme, and users will be notified about any updates.

### Built With

* **Language:** TypeScript
* **Framework:** Next.js
* **Authentication:** NextAuth.js
* **Database:** MongoDB (Mongoose)
* **Styling:** SCSS
* **Forms:** React Hook Form
* **Validations:** Zod

## Getting Started

To get a local copy of Quonim up and running, follow the steps below.

### Prerequisites

Before running Quonim locally, make sure you have the following prerequisites installed on your system:

* Node.js
* Yarn package manager or npm

### Installation

To install Quonim and its dependencies, follow these steps:

1. Clone this repository to your local machine:
   ```sh
   git clone https://github.com/idnzozkan/quonim.git
   ```
2. Navigate to the project directory:
   ```sh
   cd quonim
   ```
3. Install the dependencies using Yarn or npm:
   ```sh
   yarn install
   ```
   or
   ```sh
   npm install
   ```

### Configuration

Set up the required environment variables by creating a `.env` file based on the provided `.env.example` file. Fill in the necessary values for each environment variable.

```
MONGODB_URI=                    # MongoDB connection URI
GOOGLE_CLIENT_ID=               # Google OAuth client ID
GOOGLE_CLIENT_SECRET=           # Google OAuth client secret
NEXTAUTH_URL=                   # URL of the Quonim application
NEXTAUTH_SECRET=                # Secret used for NextAuth.js
```

### Running Locally

To run Quonim locally, use the following command:
   ```sh
   yarn dev
   ```
   or
   ```sh
   npm run dev
   ```
Open your web browser and visit [http://localhost:3000](http://localhost:3000) to access Quonim.

That's it! You've successfully installed and set up Quonim on your local machine. Now you can start exploring its features and functionality.

## Roadmap

- [ ] Add functionality to delete answered or unanswered questions.
- [ ] Add user search on the Explore page.
- [ ] Show questions on the Explore page based on the user's preferred location.
- [ ] Add the ability to answer questions using voice.
- [ ] Add a voice bio feature.
- [ ] Add functionality to send anonymous direct messages (DMs).
- [ ] Implement a notification system.

See the [open issues](https://github.com/idnzozkan/quonim/issues) for a full list of proposed features.

## Contributing

Every single contribution to Quonim is truly appreciated, no matter how big or small. Whether you want to make a minor change to the readme or add a brand-new feature, your input is valuable. Follow these guidelines to contribute to Quonim:

1. Fork the Project.
2. Create your branch (`git checkout -b feature/cool-feature`).
  - For feature branches, prefix the branch name with **feature/** to indicate that you are implementing a new feature. For example, feature/cool-feature.
  - For bug fix branches, prefix the branch name with **bug/** to indicate that you are fixing a non-urgent bug. For example, bug/pesky-bug-fix.
  - For hotfix branches, prefix the branch name with **hotfix/** to indicate that you are addressing a critical issue that requires an immediate fix. For example, hotfix/critical-issue-fix.
  - For refactor branches, prefix the branch name with **refactor/** to indicate that you are focused on refactoring or improving the codebase without introducing new features or fixing bugs. For example, refactor/code-cleanup.
  - For docs branches, prefix the branch name with **docs/** to indicate that you are updating or adding documentation. For example, docs/update-readme.
3. Commit your Changes (`git commit -m 'Add some cool feature'`).
4. Push to the Branch (`git push origin feature/cool-feature`).
5. Open a Pull Request.

You can also contribute to Quonim by opening an issue. Please do not forget to take a look at the [known issues](https://github.com/idnzozkan/quonim/issues).

Thank you very much in advance for your contribution! 🥰

## License

Distributed under the GNU General Public License v3.0 License. See `LICENSE.txt` for more information.

## Contact

Deniz Ozkan - [@deniz (Quonim)](https://quonim.vercel.app/deniz) - [@idnzozkan (Twitter)](https://twitter.com/idnzozkan) - contact.denizozkan@gmail.com
