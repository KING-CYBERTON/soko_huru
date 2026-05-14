import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../constants/app_radius.dart';

/// Sokohuru Design System — Card Component
/// Use as the base container for all card-style UI.
/// Never use Container with manual decoration for cards.
///
/// Usage:
///   SkCard(child: Text('Hello'))
///   SkCard.interactive(onTap: () {}, child: ...)
///   SkCard(highlighted: true, child: ...)  // pink border
class SkCard extends StatelessWidget {
  const SkCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
    this.highlighted  = false,
    this.elevated     = false,
    this.color,
    this.borderColor,
    this.borderRadius,
    this.margin,
    this.clipBehavior = Clip.hardEdge,
  });

  /// Convenience constructor for tappable cards
  const SkCard.interactive({
    super.key,
    required this.child,
    required this.onTap,
    this.padding,
    this.highlighted  = false,
    this.elevated     = false,
    this.color,
    this.borderColor,
    this.borderRadius,
    this.margin,
    this.clipBehavior = Clip.hardEdge,
  });

  final Widget           child;
  final EdgeInsets?      padding;
  final VoidCallback?    onTap;
  final bool             highlighted;
  final bool             elevated;
  final Color?           color;
  final Color?           borderColor;
  final BorderRadius?    borderRadius;
  final EdgeInsets?      margin;
  final Clip             clipBehavior;

  Color get _border {
    if (borderColor != null) return borderColor!;
    if (highlighted)         return AppColors.pink;
    return AppColors.border;
  }

  Color get _bg => color ?? AppColors.surface2;

  @override
  Widget build(BuildContext context) {
    final radius = borderRadius ?? AppRadius.card;

    Widget card = AnimatedContainer(
      duration:    const Duration(milliseconds: 150),
      margin:      margin,
      decoration:  BoxDecoration(
        color:        _bg,
        borderRadius: radius,
        border:       Border.all(color: _border, width: 0.5),
        boxShadow:    elevated
            ? [
                BoxShadow(
                  color:       AppColors.base.withValues(alpha: 0.4),
                  blurRadius:  12,
                  offset:      const Offset(0, 4),
                ),
              ]
            : null,
      ),
      clipBehavior: clipBehavior,
      child: padding != null
          ? Padding(padding: padding!, child: child)
          : child,
    );

    if (onTap == null) return card;

    return Material(
      color:        AppColors.transparent,
      borderRadius: radius,
      child: InkWell(
        onTap:        onTap,
        borderRadius: radius,
        splashColor:  AppColors.pink.withValues(alpha: 0.05),
        highlightColor: AppColors.pink.withValues(alpha: 0.03),
        child: card,
      ),
    );
  }
}
