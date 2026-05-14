import '../../../core/api/api_client.dart';

/// Campaign service for interacting with middleware API
class CampaignService {
  CampaignService._();

  /// Get all campaigns
  static Future<List<dynamic>> getCampaigns({
    String? status,
    int? limit,
    int? offset,
  }) async {
    final queryParams = <String, String>{};
    if (status != null) queryParams['status'] = status;
    if (limit != null) queryParams['limit'] = limit.toString();
    if (offset != null) queryParams['offset'] = offset.toString();

    final response = await ApiClient.get(
      '/campaigns',
      queryParams: queryParams.isNotEmpty ? queryParams : null,
    );

    return response['data'] as List<dynamic>;
  }

  /// Get campaign by ID
  static Future<dynamic> getCampaignById(String id) async {
    final response = await ApiClient.get('/campaigns/$id');
    return response['data'];
  }

  /// Create campaign (brand only)
  static Future<dynamic> createCampaign(Map<String, dynamic> data) async {
    final response = await ApiClient.post('/campaigns', body: data);
    return response['data'];
  }

  /// Update campaign
  static Future<dynamic> updateCampaign(
    String id,
    Map<String, dynamic> data,
  ) async {
    final response = await ApiClient.put('/campaigns/$id', body: data);
    return response['data'];
  }

  /// Delete campaign
  static Future<void> deleteCampaign(String id) async {
    await ApiClient.delete('/campaigns/$id');
  }

  /// Apply to campaign (creator only)
  static Future<dynamic> applyToCampaign(
    String campaignId,
    Map<String, dynamic> application,
  ) async {
    final response = await ApiClient.post(
      '/campaigns/$campaignId/apply',
      body: application,
    );
    return response['data'];
  }

  /// Get campaign applications
  static Future<List<dynamic>> getCampaignApplications(String campaignId) async {
    final response = await ApiClient.get('/campaigns/$campaignId/applications');
    return response['data'] as List<dynamic>;
  }
}
