import 'package:flutter/material.dart';

/// Sokohuru Design System — Border Radius Tokens
/// NEVER use raw radius values.
/// ALWAYS reference AppRadius.*
abstract class AppRadius {
  AppRadius._();

  static const xs   = 4.0;
  static const sm   = 8.0;
  static const md   = 12.0;
  static const lg   = 16.0;
  static const xl   = 20.0;
  static const full = 9999.0;

  // ─── BorderRadius helpers ─────────────────────────────────────
  static final xsBorder   = BorderRadius.circular(xs);
  static final smBorder   = BorderRadius.circular(sm);
  static final mdBorder   = BorderRadius.circular(md);
  static final lgBorder   = BorderRadius.circular(lg);
  static final xlBorder   = BorderRadius.circular(xl);
  static final fullBorder = BorderRadius.circular(full);

  // ─── Semantic aliases ─────────────────────────────────────────
  /// Standard card radius
  static final card   = lgBorder;

  /// Standard button radius
  static final button = mdBorder;

  /// Standard input field radius
  static final input  = mdBorder;

  /// Standard chip / badge radius
  static final chip   = fullBorder;

  /// Standard avatar radius
  static final avatar = fullBorder;

  /// Bottom sheet top corners
  static const bottomSheet = BorderRadius.only(
    topLeft:  Radius.circular(xl),
    topRight: Radius.circular(xl),
  );
}
