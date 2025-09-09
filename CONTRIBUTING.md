# Contributing to PWB Pilates Studio

First off, thank you for considering contributing to PWB Pilates Studio! It's people like you that make this project a great tool for the wellness community.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem.
- **Describe the exact steps which reproduce the problem** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
- **Explain which behavior you expected to see instead and why.**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion.
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
- **Provide specific examples to demonstrate the steps**.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
- **Explain why this enhancement would be useful** to most PWB Pilates Studio users.

### Pull Requests

- **Fill in the required template**
- **Do not include issue numbers in the PR title**
- **Include screenshots and animated GIFs** in your pull request whenever possible.
- **Follow the TypeScript and React styleguides**.
- **Include thoughtfully-worded, well-structured tests**.
- **Document new code** based on the Documentation Styleguide
- **End all files with a newline**

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Setting up your development environment

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/your-username/pwb-pilates-studio.git
   cd pwb-pilates-studio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env.local` file with the required environment variables (see `.env.example`)

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open http://localhost:3000 in your browser

### Making Changes

1. Create a new branch from `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes, ensuring you follow our coding standards

3. Test your changes:

   ```bash
   npm run test
   npm run lint
   npm run type-check
   ```

4. Commit your changes using conventional commit messages:

   ```bash
   git commit -m "feat: add booking cancellation feature"
   ```

5. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request on GitHub

## Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Define proper interfaces and types
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

```typescript
interface BookingData {
  id: string;
  userId: string;
  classId: string;
  status: "confirmed" | "cancelled" | "waitlist";
  createdAt: Date;
}

/**
 * Creates a new booking for a user
 * @param userId - The ID of the user making the booking
 * @param classId - The ID of the class being booked
 * @returns Promise resolving to the created booking
 */
async function createBooking(
  userId: string,
  classId: string,
): Promise<BookingData> {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Use descriptive component names
- Keep components small and focused
- Use TypeScript interfaces for props

```typescript
interface MemberCardProps {
  member: Member;
  onEdit: (member: Member) => void;
  onDelete: (memberId: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onEdit, onDelete }) => {
  return (
    <div className="member-card">
      {/* Component content */}
    </div>
  );
};
```

### CSS/Styling Guidelines

- Use Tailwind CSS utility classes
- Create custom components for reusable patterns
- Follow mobile-first responsive design
- Ensure proper contrast ratios for accessibility

```jsx
// Good: Responsive, accessible, semantic
<button className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
  Book Class
</button>
```

### Mobile Development Standards

- Test on multiple device sizes
- Ensure touch targets are at least 44px
- Support safe area insets for iPhone
- Optimize for performance on mobile devices

## Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run end-to-end tests
npm run test:e2e
```

### Writing Tests

- Write tests for all new features
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies

```typescript
describe("BookingService", () => {
  it("should create a booking successfully", async () => {
    const mockUser = { id: "user-1", email: "test@example.com" };
    const mockClass = { id: "class-1", name: "Morning Pilates" };

    const booking = await BookingService.create(mockUser.id, mockClass.id);

    expect(booking.userId).toBe(mockUser.id);
    expect(booking.classId).toBe(mockClass.id);
    expect(booking.status).toBe("confirmed");
  });
});
```

## Documentation

### Code Documentation

- Add JSDoc comments for public functions
- Update README.md for new features
- Include examples in documentation
- Keep documentation up to date

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes and messages
- Use OpenAPI/Swagger when possible

## Release Process

### Version Numbering

We use [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Checklist

Before creating a release:

- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Version number is bumped
- [ ] CHANGELOG.md is updated
- [ ] Security vulnerabilities are addressed

## Getting Help

### Where to Get Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the README and code comments
- **Email**: developer@pwbpilates.com for security issues

### Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Provide constructive feedback

## Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes for significant contributions
- GitHub contributor graph
- Special thanks in project documentation

Thank you for contributing to PWB Pilates Studio! Your efforts help make fitness and wellness more accessible to everyone in the Philippines. 🇵🇭

---

_This contributing guide is inspired by open source best practices and adapted for the PWB Pilates Studio project._
