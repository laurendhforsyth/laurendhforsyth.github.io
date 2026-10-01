const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');

if (menuToggle && navigation) {
  const submenuToggles = navigation.querySelectorAll('.nav-submenu-toggle');
  const submenuBackButtons = navigation.querySelectorAll('.submenu-back');

  const closeSubmenu = () => {
    navigation.classList.remove('show-submenu');
    navigation.querySelectorAll('.nav-group').forEach((group) => {
      group.classList.remove('is-open');
    });
    submenuToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));

    if (!isOpen) {
      closeSubmenu();
    }
  });

  submenuToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const group = toggle.closest('.nav-group');
      const heading = group?.querySelector('.submenu-header h2');

      if (!group || !heading) {
        return;
      }

      closeSubmenu();
      group.classList.add('is-open');
      navigation.classList.add('show-submenu');
      toggle.setAttribute('aria-expanded', 'true');
      heading.focus();
    });
  });

  submenuBackButtons.forEach((backButton) => {
    backButton.addEventListener('click', () => {
      const group = backButton.closest('.nav-group');
      closeSubmenu();
      group?.querySelector('.nav-submenu-toggle')?.focus();
    });
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    navigation.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    closeSubmenu();
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      menuToggle.focus();
    }
  });
}
