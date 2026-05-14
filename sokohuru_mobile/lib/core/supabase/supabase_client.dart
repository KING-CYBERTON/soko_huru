import 'package:supabase_flutter/supabase_flutter.dart';

/// Supabase client instance
/// Used throughout the app for auth and database operations
///
/// Example usage:
///   final session = await supabase.auth.currentSession;
///   final data = await supabase.from('campaigns').select();
final supabase = Supabase.instance.client;
