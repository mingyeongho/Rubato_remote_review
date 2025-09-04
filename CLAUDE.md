# Claude Code Configuration

# DBM Remote - Reviews

React application with Module Federation using Vite.

## Project Context

This is a React + TypeScript project using:

- Vite as the build tool
- Module Federation for micro-frontends
- ESLint for linting
- SWC for fast compilation

## Available Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production (TypeScript compilation + Vite build)
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## Git Commit Convention

```
type: subject

body
```

### Types

- `feat` - 새로운 기능 추가
- `fix` - 버그 수정
- `docs` - 문서 변경
- `style` - 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor` - 코드 리팩토링
- `test` - 테스트 코드 추가/수정
- `chore` - 빌드 프로세스 또는 보조 도구 변경

### Examples

```
feat: Add user authentication module

- Implement login/logout functionality
- Add JWT token management
- Create protected route components
```

```
fix: Resolve memory leak in component unmount

Update useEffect cleanup to properly remove event listeners
```

```
refactor: Extract common validation logic

Move shared form validation to utils/validation.js
```

## File Structure

- `src/` - Source code
- `vite.config.ts` - Vite configuration with Module Federation setup

## Notes

- Uses Module Federation for micro-frontend architecture
- TypeScript strict mode enabled
- React 19 with SWC for fast refresh
