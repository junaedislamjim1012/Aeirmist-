const fs = require('fs');

// 1. Update Navigation.tsx
const navPath = 'src/components/Navigation.tsx';
let navContent = fs.readFileSync(navPath, 'utf8');

if (!navContent.includes('handleItemClick')) {
  navContent = navContent.replace(
    '  const handleMouseEnter = React.useCallback(() => {',
    `  const handleItemClick = React.useCallback((callback?: () => void) => {
    setIsHovered(false);
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
    }
    if (callback) callback();
  }, []);

  const handleMouseEnter = React.useCallback(() => {`
  );

  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('feed'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('feed'))}");
  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('dashboard'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('dashboard'))}");
  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('discover'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('discover'))}");
  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('videos'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('videos'))}");
  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('messenger'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('messenger'))}");
  navContent = navContent.replace(/onClick=\{onNotificationsClick\}/g, "onClick={() => handleItemClick(onNotificationsClick)}");
  navContent = navContent.replace(/onClick=\{onCreate\}/g, "onClick={() => handleItemClick(onCreate)}");
  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('profile'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('profile'))}");
  navContent = navContent.replace(/onClick=\{\(\) => onTabChange\('settings'\)\}/g, "onClick={() => handleItemClick(() => onTabChange('settings'))}");
  navContent = navContent.replace(/onClick=\{\(\) => \{\s*onTabChange\('admin' as any\);[\s\S]*?\}\}/g, "onClick={() => handleItemClick(() => { onTabChange('admin' as any); if (window.location.pathname !== '/admin-panel') { window.history.pushState({}, '', '/admin-panel'); } })}");

  fs.writeFileSync(navPath, navContent, 'utf8');
  console.log("Updated Navigation.tsx");
}

// 2. Update App.tsx for sidebar persistence & initialization without reset loop
const appPath = 'src/App.tsx';
let appContent = fs.readFileSync(appPath, 'utf8');

if (!appContent.includes('sidebarInitializedRef')) {
  appContent = appContent.replace(
    '  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);',
    `  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const sidebarInitializedRef = useRef(false);`
  );

  appContent = appContent.replace(
    `  useEffect(() => {
    if (settings?.desktopSidebarMode) {
      setIsSidebarExpanded(settings.desktopSidebarMode === 'pinned');
    }
  }, [settings?.desktopSidebarMode]);`,
    `  useEffect(() => {
    if (settings?.desktopSidebarMode && !sidebarInitializedRef.current) {
      setIsSidebarExpanded(settings.desktopSidebarMode === 'pinned');
      sidebarInitializedRef.current = true;
    }
  }, [settings?.desktopSidebarMode]);`
  );

  appContent = appContent.replace(
    `            isExpanded={isSidebarExpanded}
            setIsExpanded={setIsSidebarExpanded}`,
    `            isExpanded={isSidebarExpanded}
            setIsExpanded={(val) => {
              setIsSidebarExpanded(val);
              updateAppearanceSettings({ desktopSidebarMode: val ? 'pinned' : 'hover' }).catch(() => {});
            }}`
  );

  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log("Updated App.tsx");
}
