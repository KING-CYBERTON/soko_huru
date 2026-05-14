import 'package:flutter_dotenv/flutter_dotenv.dart';

/// Application Configuration
/// Loads environment variables from .env file
/// NEVER hardcode sensitive values — always read from AppConfig
class AppConfig {
  AppConfig._();

  static late final String supabaseUrl;
  static late final String supabaseAnonKey;
  static late final String apiBaseUrl;

  /// Load configuration from .env file
  /// Must be called before runApp() in main.dart
  static Future<void> load() async {
    await dotenv.load(fileName: '.env');

    supabaseUrl = dotenv.env['SUPABASE_URL']!;
    supabaseAnonKey = dotenv.env['SUPABASE_ANON_KEY']!;
    apiBaseUrl = dotenv.env['API_BASE_URL']!;
  }
}
