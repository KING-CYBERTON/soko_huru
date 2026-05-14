import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';
import '../../constants/app_spacing.dart';

/// Sokohuru Design System — Screen Scaffold
/// Wraps every screen with consistent background, status bar,
/// and optional top bar. Never use Scaffold directly in screens.
///
/// Usage:
///   SkScaffold(
///     title: 'Discover',
///     child: YourScreenContent(),
///   )
///   SkScaffold(
///     title: 'Campaign detail',
///     showBack: true,
///     actions: [IconButton(...)],
///     child: ...,
///   )
///   SkScaffold.noBar(child: ...)  // full screen, no top bar
class SkScaffold extends StatelessWidget {
  const SkScaffold({
    super.key,
    required this.child,
    this.title,
    this.showBack       = false,
    this.onBack,
    this.actions,
    this.bottomBar,
    this.floatingActionButton,
    this.backgroundColor,
    this.resizeToAvoidBottomInset = true,
    this.padding,
  }) : showTopBar = true;

  /// Full screen — no app bar (splash, onboarding, auth)
  const SkScaffold.noBar({
    super.key,
    required this.child,
    this.backgroundColor,
    this.resizeToAvoidBottomInset = true,
    this.padding,
  })  : title                  = null,
        showBack               = false,
        onBack                 = null,
        actions                = null,
        bottomBar              = null,
        floatingActionButton   = null,
        showTopBar             = false;

  final Widget            child;
  final String?           title;
  final bool              showBack;
  final VoidCallback?     onBack;
  final List<Widget>?     actions;
  final Widget?           bottomBar;
  final Widget?           floatingActionButton;
  final Color?            backgroundColor;
  final bool              resizeToAvoidBottomInset;
  final EdgeInsets?       padding;
  final bool              showTopBar;

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.light.copyWith(
        statusBarColor:            AppColors.transparent,
        statusBarBrightness:       Brightness.dark,
        statusBarIconBrightness:   Brightness.light,
      ),
      child: Scaffold(
        backgroundColor:          backgroundColor ?? AppColors.base,
        resizeToAvoidBottomInset: resizeToAvoidBottomInset,
        appBar: showTopBar ? _buildAppBar(context) : null,
        body: padding != null
            ? Padding(padding: padding!, child: child)
            : child,
        bottomNavigationBar:      bottomBar,
        floatingActionButton:     floatingActionButton,
      ),
    );
  }

  PreferredSizeWidget _buildAppBar(BuildContext context) {
    return PreferredSize(
      preferredSize: const Size.fromHeight(AppSpacing.topBarHeight),
      child: Container(
        height:     AppSpacing.topBarHeight + MediaQuery.of(context).padding.top,
        padding:    EdgeInsets.only(top: MediaQuery.of(context).padding.top),
        decoration: const BoxDecoration(
          color: AppColors.surface1,
          border: Border(
            bottom: BorderSide(color: AppColors.border, width: 0.5),
          ),
        ),
        child: Row(
          children: [
            // Back button
            if (showBack)
              GestureDetector(
                onTap: onBack ?? () => Navigator.of(context).pop(),
                child: Container(
                  width:  AppSpacing.topBarHeight,
                  height: AppSpacing.topBarHeight,
                  alignment: Alignment.center,
                  child: const Icon(
                    Icons.arrow_back_ios_new_rounded,
                    color: AppColors.textSecondary,
                    size:  18,
                  ),
                ),
              )
            else
              const SizedBox(width: AppSpacing.lg),

            // Title
            Expanded(
              child: Text(
                title ?? '',
                style:    AppTypography.headingMd,
                overflow: TextOverflow.ellipsis,
              ),
            ),

            // Actions
            if (actions != null)
              Row(mainAxisSize: MainAxisSize.min, children: actions!)
            else
              const SizedBox(width: AppSpacing.lg),
          ],
        ),
      ),
    );
  }
}
