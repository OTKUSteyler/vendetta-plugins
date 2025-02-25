import { storage } from "@vendetta/plugin";
import { findByProps } from "@vendetta/metro";
import { registerSettings } from "@vendetta/settings";
import SettingsPage from "./settings";

// Find the Profile Effect system
const ProfileEffects = findByProps("getProfileEffect");

// Default storage values
storage.fakeEffectsEnabled = storage.fakeEffectsEnabled ?? true;
storage.fakeThemeEnabled = storage.fakeThemeEnabled ?? true;

// Apply Fake Profile Effects & Themes
export const applyFakeProfileModifications = () => {
  if (!ProfileEffects) return;

  if (storage.fakeEffectsEnabled) {
    ProfileEffects.getProfileEffect = () => ({
      appliedEffectId: "fake_effect",
      unlockedEffects: ["fake_effect_1", "fake_effect_2", "fake_effect_3"],
    });
  }

  if (storage.fakeThemeEnabled) {
    ProfileEffects.getProfileTheme = () => ({
      appliedThemeId: "fake_theme",
      unlockedThemes: ["fake_theme_1", "fake_theme_2"],
    });
  }
};

// Run automatically when the plugin loads
export const onLoad = () => {
  applyFakeProfileModifications();
  registerSettings("fake-profile-settings", SettingsPage);
};

// Reset modifications when the plugin is unloaded
export const onUnload = () => {
  if (ProfileEffects) {
    ProfileEffects.getProfileEffect = null;
    ProfileEffects.getProfileTheme = null;
  }
};
