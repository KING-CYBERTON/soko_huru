import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';
import '../supabase/supabase_client.dart';
import 'api_exception.dart';

/// API client for making authenticated requests to middleware
class ApiClient {
  ApiClient._();

  static final _client = http.Client();
  static const _timeout = Duration(seconds: 30);

  /// Get authorization header from Supabase session
  static Future<Map<String, String>> get _headers async {
    final session = supabase.auth.currentSession;
    final headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (session?.accessToken != null) {
      headers['Authorization'] = 'Bearer ${session!.accessToken}';
    }

    return headers;
  }

  /// GET request
  static Future<dynamic> get(
    String endpoint, {
    Map<String, String>? queryParams,
  }) async {
    try {
      final uri = Uri.parse('${AppConfig.apiBaseUrl}$endpoint')
          .replace(queryParameters: queryParams);

      final response = await _client
          .get(uri, headers: await _headers)
          .timeout(_timeout);

      return _handleResponse(response);
    } on SocketException {
      throw ApiException.network();
    } on HttpException {
      throw ApiException.network();
    } on FormatException {
      throw ApiException(message: 'Invalid response format');
    } catch (e) {
      if (e is ApiException) rethrow;
      throw ApiException.unknown();
    }
  }

  /// POST request
  static Future<dynamic> post(
    String endpoint, {
    Map<String, dynamic>? body,
  }) async {
    try {
      final uri = Uri.parse('${AppConfig.apiBaseUrl}$endpoint');

      final response = await _client
          .post(
            uri,
            headers: await _headers,
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(_timeout);

      return _handleResponse(response);
    } on SocketException {
      throw ApiException.network();
    } on HttpException {
      throw ApiException.network();
    } on FormatException {
      throw ApiException(message: 'Invalid response format');
    } catch (e) {
      if (e is ApiException) rethrow;
      throw ApiException.unknown();
    }
  }

  /// PUT request
  static Future<dynamic> put(
    String endpoint, {
    Map<String, dynamic>? body,
  }) async {
    try {
      final uri = Uri.parse('${AppConfig.apiBaseUrl}$endpoint');

      final response = await _client
          .put(
            uri,
            headers: await _headers,
            body: body != null ? jsonEncode(body) : null,
          )
          .timeout(_timeout);

      return _handleResponse(response);
    } on SocketException {
      throw ApiException.network();
    } on HttpException {
      throw ApiException.network();
    } on FormatException {
      throw ApiException(message: 'Invalid response format');
    } catch (e) {
      if (e is ApiException) rethrow;
      throw ApiException.unknown();
    }
  }

  /// DELETE request
  static Future<dynamic> delete(String endpoint) async {
    try {
      final uri = Uri.parse('${AppConfig.apiBaseUrl}$endpoint');

      final response = await _client
          .delete(uri, headers: await _headers)
          .timeout(_timeout);

      return _handleResponse(response);
    } on SocketException {
      throw ApiException.network();
    } on HttpException {
      throw ApiException.network();
    } on FormatException {
      throw ApiException(message: 'Invalid response format');
    } catch (e) {
      if (e is ApiException) rethrow;
      throw ApiException.unknown();
    }
  }

  /// Handle HTTP response
  static dynamic _handleResponse(http.Response response) {
    final statusCode = response.statusCode;

    // Parse response body
    dynamic data;
    try {
      data = jsonDecode(response.body);
    } catch (_) {
      data = response.body;
    }

    // Success responses (200-299)
    if (statusCode >= 200 && statusCode < 300) {
      return data;
    }

    // Error responses
    throw ApiException.fromResponse(statusCode, data);
  }

  /// Close the client
  static void dispose() {
    _client.close();
  }
}
