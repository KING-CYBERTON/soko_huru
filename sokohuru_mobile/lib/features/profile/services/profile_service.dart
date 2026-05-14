import '../../../core/api/api_client.dart';

/// Profile service for interacting with middleware API
class ProfileService {
  ProfileService._();

  /// Get current user profile
  static Future<dynamic> getMyProfile() async {
    final response = await ApiClient.get('/profile');
    return response['data'];
  }

  /// Update profile
  static Future<dynamic> updateProfile(Map<String, dynamic> data) async {
    final response = await ApiClient.put('/profile', body: data);
    return response['data'];
  }

  /// Get creator profile by ID (public)
  static Future<dynamic> getCreatorProfile(String id) async {
    final response = await ApiClient.get('/creators/$id');
    return response['data'];
  }

  /// Search creators (brand only)
  static Future<List<dynamic>> searchCreators({
    String? query,
    List<String>? categories,
    int? minFollowers,
    int? limit,
    int? offset,
  }) async {
    final queryParams = <String, String>{};
    if (query != null) queryParams['q'] = query;
    if (categories != null) queryParams['categories'] = categories.join(',');
    if (minFollowers != null) {
      queryParams['min_followers'] = minFollowers.toString();
    }
    if (limit != null) queryParams['limit'] = limit.toString();
    if (offset != null) queryParams['offset'] = offset.toString();

    final response = await ApiClient.get(
      '/creators',
      queryParams: queryParams.isNotEmpty ? queryParams : null,
    );

    return response['data'] as List<dynamic>;
  }

  /// Upload avatar
  static Future<String> uploadAvatar(String filePath) async {
    // TODO: Implement multipart file upload
    throw UnimplementedError('File upload not yet implemented');
  }

  /// Get stats for current user
  static Future<dynamic> getStats() async {
    final response = await ApiClient.get('/profile/stats');
    return response['data'];
  }
}
