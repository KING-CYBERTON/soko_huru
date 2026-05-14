import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../theme/app_colors.dart';
import '../../theme/app_typography.dart';
import '../../constants/app_spacing.dart';

/// Sokohuru Design System — Input Component
/// Use this for ALL text inputs in the app.
/// Never use TextField or TextFormField directly.
///
/// Usage:
///   SkInput(label: 'Email', placeholder: 'maya@email.com')
///   SkInput(label: 'Password', obscureText: true)
///   SkInput(label: 'Bio', maxLines: 4)
///   SkInput(label: 'Amount', error: 'Required field')
class SkInput extends StatefulWidget {
  const SkInput({
    super.key,
    this.label,
    this.placeholder,
    this.hint,
    this.error,
    this.controller,
    this.focusNode,
    this.onChanged,
    this.onSubmitted,
    this.validator,
    this.keyboardType,
    this.textInputAction,
    this.obscureText    = false,
    this.enabled        = true,
    this.readOnly       = false,
    this.autofocus      = false,
    this.maxLines       = 1,
    this.minLines,
    this.maxLength,
    this.prefixIcon,
    this.suffixIcon,
    this.inputFormatters,
    this.initialValue,
  });

  final String?                  label;
  final String?                  placeholder;
  final String?                  hint;
  final String?                  error;
  final TextEditingController?   controller;
  final FocusNode?               focusNode;
  final ValueChanged<String>?    onChanged;
  final ValueChanged<String>?    onSubmitted;
  final FormFieldValidator<String>? validator;
  final TextInputType?           keyboardType;
  final TextInputAction?         textInputAction;
  final bool                     obscureText;
  final bool                     enabled;
  final bool                     readOnly;
  final bool                     autofocus;
  final int                      maxLines;
  final int?                     minLines;
  final int?                     maxLength;
  final Widget?                  prefixIcon;
  final Widget?                  suffixIcon;
  final List<TextInputFormatter>? inputFormatters;
  final String?                  initialValue;

  @override
  State<SkInput> createState() => _SkInputState();
}

class _SkInputState extends State<SkInput> {
  bool _obscure = false;
  bool _isFocused = false;
  late FocusNode _focusNode;

  @override
  void initState() {
    super.initState();
    _obscure    = widget.obscureText;
    _focusNode  = widget.focusNode ?? FocusNode();
    _focusNode.addListener(() {
      setState(() => _isFocused = _focusNode.hasFocus);
    });
  }

  @override
  void dispose() {
    if (widget.focusNode == null) _focusNode.dispose();
    super.dispose();
  }

  Color get _borderColor {
    if (widget.error != null) return AppColors.error;
    if (_isFocused)           return AppColors.pink;
    return AppColors.border;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        // Label
        if (widget.label != null) ...[
          Text(widget.label!, style: AppTypography.labelMd),
          const SizedBox(height: AppSpacing.xs + 1),
        ],

        // Input field
        AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          decoration: BoxDecoration(
            color:        AppColors.surface2,
            borderRadius: BorderRadius.circular(12),
            border:       Border.all(color: _borderColor, width: 0.5),
          ),
          child: TextFormField(
            controller:        widget.controller,
            focusNode:         _focusNode,
            initialValue:      widget.initialValue,
            onChanged:         widget.onChanged,
            onFieldSubmitted:  widget.onSubmitted,
            validator:         widget.validator,
            keyboardType:      widget.keyboardType,
            textInputAction:   widget.textInputAction,
            obscureText:       _obscure,
            enabled:           widget.enabled,
            readOnly:          widget.readOnly,
            autofocus:         widget.autofocus,
            maxLines:          widget.obscureText ? 1 : widget.maxLines,
            minLines:          widget.minLines,
            maxLength:         widget.maxLength,
            inputFormatters:   widget.inputFormatters,
            style:             AppTypography.bodyMd.copyWith(
                                 color: AppColors.textPrimary),
            decoration: InputDecoration(
              hintText:        widget.placeholder,
              hintStyle:       AppTypography.bodyMd.copyWith(
                                 color: AppColors.muted),
              border:          InputBorder.none,
              enabledBorder:   InputBorder.none,
              focusedBorder:   InputBorder.none,
              errorBorder:     InputBorder.none,
              disabledBorder:  InputBorder.none,
              contentPadding:  const EdgeInsets.symmetric(
                                 horizontal: 14, vertical: 11),
              counterText:     '',
              prefixIcon:      widget.prefixIcon,
              suffixIcon:      widget.obscureText
                  ? IconButton(
                      icon: Icon(
                        _obscure ? Icons.visibility_off : Icons.visibility,
                        color: AppColors.textMuted,
                        size: 18,
                      ),
                      onPressed: () => setState(() => _obscure = !_obscure),
                    )
                  : widget.suffixIcon,
            ),
          ),
        ),

        // Hint or error text
        if (widget.error != null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(
            widget.error!,
            style: AppTypography.caption.copyWith(color: AppColors.errorText),
          ),
        ] else if (widget.hint != null) ...[
          const SizedBox(height: AppSpacing.xs),
          Text(widget.hint!, style: AppTypography.caption),
        ],
      ],
    );
  }
}
