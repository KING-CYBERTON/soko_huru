import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';

enum SkAvatarSize { xs, sm, md, lg, xl }

/// Sokohuru Design System — Avatar Component
/// Displays user or brand initials or image.
/// Never use CircleAvatar directly.
///
/// Usage:
///   SkAvatar(initials: 'MR')
///   SkAvatar(initials: 'GL', size: SkAvatarSize.lg)
///   SkAvatar(initials: 'ZK', imageUrl: 'https://...')
///   SkAvatar.square(initials: 'GL', size: SkAvatarSize.md)
class SkAvatar extends StatelessWidget {
  const SkAvatar({
    super.key,
    required this.initials,
    this.imageUrl,
    this.size     = SkAvatarSize.md,
    this.isSquare = false,
    this.color,
    this.textColor,
  });

  /// Square variant for brand logos
  const SkAvatar.square({
    super.key,
    required this.initials,
    this.imageUrl,
    this.size     = SkAvatarSize.md,
    this.color,
    this.textColor,
  }) : isSquare = true;

  final String  initials;
  final String? imageUrl;
  final SkAvatarSize size;
  final bool    isSquare;
  final Color?  color;
  final Color?  textColor;

  double get _dimension => switch (size) {
    SkAvatarSize.xs => 24,
    SkAvatarSize.sm => 32,
    SkAvatarSize.md => 40,
    SkAvatarSize.lg => 56,
    SkAvatarSize.xl => 72,
  };

  double get _fontSize => switch (size) {
    SkAvatarSize.xs => 9,
    SkAvatarSize.sm => 11,
    SkAvatarSize.md => 13,
    SkAvatarSize.lg => 18,
    SkAvatarSize.xl => 24,
  };

  double get _radius => isSquare
      ? switch (size) {
          SkAvatarSize.xs => 4,
          SkAvatarSize.sm => 6,
          SkAvatarSize.md => 8,
          SkAvatarSize.lg => 10,
          SkAvatarSize.xl => 14,
        }
      : _dimension / 2;

  String get _safeInitials =>
      initials.trim().isEmpty ? '?' : initials.trim().substring(0, 
        initials.trim().length.clamp(0, 2)).toUpperCase();

  @override
  Widget build(BuildContext context) {
    final bg  = color ?? AppColors.pink50;
    final fg  = textColor ?? AppColors.pinkLight;

    return ClipRRect(
      borderRadius: BorderRadius.circular(_radius),
      child: SizedBox(
        width:  _dimension,
        height: _dimension,
        child:  imageUrl != null && imageUrl!.isNotEmpty
            ? CachedNetworkImage(
                imageUrl:    imageUrl!,
                fit:         BoxFit.cover,
                placeholder: (_, __) => _InitialsView(
                  initials: _safeInitials,
                  bg: bg, fg: fg,
                  fontSize: _fontSize,
                ),
                errorWidget: (_, __, ___) => _InitialsView(
                  initials: _safeInitials,
                  bg: bg, fg: fg,
                  fontSize: _fontSize,
                ),
              )
            : _InitialsView(
                initials: _safeInitials,
                bg: bg, fg: fg,
                fontSize: _fontSize,
              ),
      ),
    );
  }
}

class _InitialsView extends StatelessWidget {
  const _InitialsView({
    required this.initials,
    required this.bg,
    required this.fg,
    required this.fontSize,
  });

  final String initials;
  final Color  bg;
  final Color  fg;
  final double fontSize;

  @override
  Widget build(BuildContext context) => ColoredBox(
    color: bg,
    child: Center(
      child: Text(
        initials,
        style: AppTypography.bodyMd.copyWith(
          color:      fg,
          fontSize:   fontSize,
          fontWeight: FontWeight.w600,
        ),
      ),
    ),
  );
}
