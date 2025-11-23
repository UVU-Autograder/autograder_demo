# Enhancement Implementation Plan

## Critical Issues Identified

1. ✅ **Dark Mode Consistency** - The Monaco editor is dark but rest of UI is light
2. ⚠️ **Missing Instructor Dashboard** - No way for instructors to manage assignments
3. ⚠️ **Minimal UI/UX** - Lacks animations, polish, and professional feel
4. ⚠️ **Code Organization** - Needs better modularity and separation of concerns
5. ⚠️ **Missing Features** - Test case builder, rubric customization, AI settings

## Implementation Priority

### Phase 1: Core UI/UX Improvements (CRITICAL - 2-3 hours)
- [x] Install UI enhancement packages (sonner, framer-motion, zustand)
- [x] Create Theme Provider with dark mode support
- [x] Update global CSS with proper dark mode variables
- [ ] Enhance homepage with animations and better design
- [ ] Improve assignment page consistency (all dark mode)
- [ ] Add loading skeletons and transitions
- [ ] Add toast notifications for user feedback

### Phase 2: Instructor Dashboard (HIGH - 3-4 hours)
- [ ] Create `/instructor` route
- [ ] Assignment management interface (CRUD)
- [ ] Test case builder with drag-and-drop
- [ ] Rubric configuration interface
- [ ] AI settings customization
- [ ] Bulk operations view

### Phase 3: Code Organization (MEDIUM - 2 hours)
- [x] Create `lib/constants.ts` for configuration
- [ ] Create custom hooks in `hooks/`
- [ ] Add validators in `lib/validators/`
- [ ] Refactor services for better modularity
- [ ] Add state management with Zustand

### Phase 4: Advanced Features (MEDIUM - 2-3 hours)
- [ ] Real-time progress indicators
- [ ] Optimistic UI updates
- [ ] Better error handling with recovery
- [ ] Export/import assignment templates
- [ ] Assignment templates library

## Detailed Implementation

### 1. Dark Mode Consistency

**Problem**: Monaco editor is dark, rest is light
**Solution**: Implement theme provider, make everything dark by default

Files to modify:
- ✅ app/layout.tsx - Add ThemeProvider
- ✅ app/globals.css - Add dark mode CSS variables
- ✅ components/theme-provider.tsx - Create provider
- ✅ components/theme-toggle.tsx - Add toggle button
- [ ] app/page.tsx - Update with dark mode styles
- [ ] app/assignment/[id]/page.tsx - Ensure consistency
- [ ] app/bulk/page.tsx - Update dark mode

### 2. Homepage Enhancement

Current: Basic cards with minimal design
Target: Professional, animated, gradient backgrounds

Changes needed:
```tsx
- Add framer-motion for card animations
- Gradient hero section
- Better typography and spacing
- Hover effects and micro-interactions
- Stats/metrics section
- Feature highlights
```

### 3. Assignment Page Enhancement

Current: Functional but basic
Target: LeetCode-level polish

Changes needed:
```tsx
- Consistent dark theme across all panels
- Better test result visualization
- Progress bars for test execution
- Animated score reveal
- Code diff viewer for errors
- Syntax highlighting in feedback
```

### 4. Instructor Dashboard Structure

```
/instructor
├── /assignments          # List and manage all assignments
│   ├── /new             # Create new assignment
│   └── /[id]/edit       # Edit existing assignment
├── /test-cases          # Test case builder
├── /rubrics             # Rubric templates
├── /settings            # AI and grading settings
└── /analytics           # Grading statistics
```

Key Features:
- Assignment CRUD with rich text editor
- Visual test case builder
- Rubric weight customization
- AI model selection and prompt engineering
- Bulk import/export
- Student submission analytics

### 5. Code Organization Improvements

Current structure:
```
lib/
├── services/
│   ├── judge0.service.ts
│   ├── openrouter.service.ts
│   └── grading.service.ts
├── types.ts
└── assignments.ts
```

Improved structure:
```
lib/
├── services/
│   ├── judge0.service.ts
│   ├── openrouter.service.ts
│   ├── grading.service.ts
│   └── assignment.service.ts      # NEW
├── hooks/
│   ├── useAssignments.ts          # NEW
│   ├── useGrading.ts              # NEW
│   └── useTestExecution.ts        # NEW
├── validators/
│   ├── assignment.validator.ts     # NEW
│   └── testcase.validator.ts      # NEW
├── stores/
│   └── assignment.store.ts        # NEW (Zustand)
├── constants.ts                    # DONE
├── types.ts
└── utils.ts
```

### 6. UI Component Enhancements

New components needed:
```
components/
├── ui/                    # Existing
├── assignment/
│   ├── AssignmentCard.tsx         # Enhanced with animations
│   ├── TestCaseViewer.tsx         # Better test visualization
│   ├── CodeDiffViewer.tsx         # Show differences
│   └── FeedbackPanel.tsx          # Rich feedback display
├── instructor/
│   ├── AssignmentForm.tsx         # Create/edit assignments
│   ├── TestCaseBuilder.tsx        # Interactive builder
│   ├── RubricEditor.tsx           # Visual rubric editor
│   └── AISettings.tsx             # Configure AI behavior
├── shared/
│   ├── LoadingSkeleton.tsx        # Loading states
│   ├── AnimatedNumber.tsx         # Score animations
│   └── ProgressBar.tsx            # Progress indicators
├── theme-provider.tsx     # DONE
└── theme-toggle.tsx       # DONE
```

### 7. Animation Strategy

Use framer-motion for:
- Page transitions
- Card hover effects
- Score reveal animations
- Progress indicators
- Modal/dialog animations
- List item stagger effects

Example:
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {content}
</motion.div>
```

### 8. Toast Notifications

Use sonner for:
- Code execution started
- Code execution completed
- Submission success/failure
- Save confirmations
- Error messages
- Copy to clipboard feedback

### 9. Loading States

Add skeletons for:
- Assignment list loading
- Code execution in progress
- AI feedback generation
- Bulk processing status

### 10. Error Handling

Improve error UX:
- Friendly error messages
- Retry mechanisms
- Fallback UI
- Error boundaries
- Network error detection

## Metrics for Success

### UI/UX
- [ ] All pages have consistent dark theme
- [ ] Smooth animations (60fps)
- [ ] Loading states for all async operations
- [ ] Toast feedback for user actions
- [ ] Mobile responsive (bonus)

### Functionality
- [ ] Instructor can create assignments without editing JSON
- [ ] Test cases can be added via UI
- [ ] Rubric weights are customizable
- [ ] AI settings are configurable
- [ ] Bulk operations have progress indicators

### Code Quality
- [ ] Services are modular and testable
- [ ] Custom hooks for reusable logic
- [ ] Validators for input validation
- [ ] Constants for configuration
- [ ] Type safety throughout

## Timeline Estimate

- **Immediate (1-2 hours)**: Dark mode consistency, homepage polish
- **Short term (2-4 hours)**: Instructor dashboard basics
- **Medium term (4-6 hours)**: Full instructor features
- **Long term (6-8 hours)**: Advanced animations and polish

## Next Steps

1. Complete dark mode consistency
2. Polish homepage with animations
3. Build basic instructor dashboard
4. Add test case builder
5. Implement code organization improvements
6. Add advanced UI polish
