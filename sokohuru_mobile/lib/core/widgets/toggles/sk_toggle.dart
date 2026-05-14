import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';
import '../../constants/app_spacing.dart';

/// Sokohuru Design System — Toggle / Switch Component
/// Use for boolean settings (platform availability, notifications etc).
/// Never use Switch directly.
///
/// Usage:
///   SkToggle(
///     label: 'Instagram available',
///     value: isAvailable,
///     onChanged: (v) => setState(() => isAvailable = v),
///   )
///   SkToggle(
///     label: 'Email notifications',
///     sublabel: 'Receive updates on your campaigns',
///     value: notificationsOn,
///     onChanged: (v) => updateSettings(v),
///   )
class SkToggle extends StatelessWidget {
  const SkToggle({
    super.key,
    required this.label,
    required this.value,
    required this.onChanged,
    this.sublabel,
    this.enabled = true,
  });

  final String          label;
  final String?         sublabel;
  final bool            value;
  final ValueChanged<bool> onChanged;
  final bool            enabled;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: enabled ? () => onChanged(!value) : null,
      behavior: HitTestBehavior.opaque,
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm + 1),
        child: Row(
          children: [
            // Labels
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Text(
                    label,
                    style: AppTypography.headingSm.copyWith(
                      color: enabled
                          ? AppColors.textPrimary
                          : AppColors.textDisabled,
                    ),
                  ),
                  if (sublabel != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      sublabel!,
                      style: AppTypography.caption.copyWith(
                        color: enabled
                            ? AppColors.textMuted
                            : AppColors.textDisabled,
                      ),
                    ),
                  ],
                ],
              ),
            ),
            const SizedBox(width: AppSpacing.md),

            // Custom toggle track
            AnimatedContainer(
              duration:    const Duration(milliseconds: 200),
              width:       36,
              height:      20,
              decoration:  BoxDecoration(
                color:        enabled
                    ? (value ? AppColors.pink : AppColors.border)
                    : AppColors.muted,
                borderRadius: BorderRadius.circular(10),
              ),
              child: AnimatedAlign(
                duration:  const Duration(milliseconds: 200),
                alignment: value
                    ? Alignment.centerRight
                    : Alignment.centerLeft,
                child: Padding(
                  padding: const EdgeInsets.all(2),
                  child: Container(
                    width:  16,
                    height: 16,
                    decoration: const BoxDecoration(
                      color: AppColors.white,
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
