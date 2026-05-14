/// Route paths for the application
abstract class AppRoutes {
  AppRoutes._();

  // ─── Auth routes ─────────────────────────────────────────────
  static const splash = '/';
  static const signIn = '/sign-in';
  static const creatorSignUp = '/creator-sign-up';
  static const brandSignUp = '/brand-sign-up';
  static const forgotPassword = '/forgot-password';

  // ─── Creator routes ──────────────────────────────────────────
  static const creatorHome = '/creator';
  static const creatorCampaigns = '/creator/campaigns';
  static const creatorProfile = '/creator/profile';
  static const creatorSettings = '/creator/settings';

  // ─── Brand routes ────────────────────────────────────────────
  static const brandHome = '/brand';
  static const brandCampaigns = '/brand/campaigns';
  static const brandCreators = '/brand/creators';
  static const brandProfile = '/brand/profile';
  static const brandSettings = '/brand/settings';
}
