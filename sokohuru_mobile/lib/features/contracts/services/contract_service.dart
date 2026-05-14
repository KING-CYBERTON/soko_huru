import '../../../core/api/api_client.dart';

/// Contract service for interacting with middleware API
class ContractService {
  ContractService._();

  /// Get all contracts for current user
  static Future<List<dynamic>> getContracts({
    String? status,
    int? limit,
    int? offset,
  }) async {
    final queryParams = <String, String>{};
    if (status != null) queryParams['status'] = status;
    if (limit != null) queryParams['limit'] = limit.toString();
    if (offset != null) queryParams['offset'] = offset.toString();

    final response = await ApiClient.get(
      '/contracts',
      queryParams: queryParams.isNotEmpty ? queryParams : null,
    );

    return response['data'] as List<dynamic>;
  }

  /// Get contract by ID
  static Future<dynamic> getContractById(String id) async {
    final response = await ApiClient.get('/contracts/$id');
    return response['data'];
  }

  /// Create contract (brand only)
  static Future<dynamic> createContract(Map<String, dynamic> data) async {
    final response = await ApiClient.post('/contracts', body: data);
    return response['data'];
  }

  /// Accept contract (creator only)
  static Future<dynamic> acceptContract(String id) async {
    final response = await ApiClient.post('/contracts/$id/accept');
    return response['data'];
  }

  /// Reject contract (creator only)
  static Future<dynamic> rejectContract(String id, String? reason) async {
    final response = await ApiClient.post(
      '/contracts/$id/reject',
      body: reason != null ? {'reason': reason} : null,
    );
    return response['data'];
  }

  /// Complete contract
  static Future<dynamic> completeContract(String id) async {
    final response = await ApiClient.post('/contracts/$id/complete');
    return response['data'];
  }

  /// Submit deliverable (creator only)
  static Future<dynamic> submitDeliverable(
    String contractId,
    Map<String, dynamic> deliverable,
  ) async {
    final response = await ApiClient.post(
      '/contracts/$contractId/deliverables',
      body: deliverable,
    );
    return response['data'];
  }

  /// Review deliverable (brand only)
  static Future<dynamic> reviewDeliverable(
    String contractId,
    String deliverableId,
    Map<String, dynamic> review,
  ) async {
    final response = await ApiClient.post(
      '/contracts/$contractId/deliverables/$deliverableId/review',
      body: review,
    );
    return response['data'];
  }
}
