/// API exception for handling errors
class ApiException implements Exception {
  final String message;
  final int? statusCode;
  final dynamic data;

  ApiException({
    required this.message,
    this.statusCode,
    this.data,
  });

  @override
  String toString() {
    if (statusCode != null) {
      return 'ApiException ($statusCode): $message';
    }
    return 'ApiException: $message';
  }

  /// Create from HTTP response
  factory ApiException.fromResponse(int statusCode, dynamic data) {
    String message;

    switch (statusCode) {
      case 400:
        message = 'Bad request';
        break;
      case 401:
        message = 'Unauthorized';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
      default:
        message = 'Request failed';
    }

    // Try to extract error message from response
    if (data is Map && data['message'] != null) {
      message = data['message'];
    } else if (data is Map && data['error'] != null) {
      message = data['error'];
    }

    return ApiException(
      message: message,
      statusCode: statusCode,
      data: data,
    );
  }

  /// Network error
  factory ApiException.network([String? message]) {
    return ApiException(
      message: message ?? 'Network error. Please check your connection.',
    );
  }

  /// Timeout error
  factory ApiException.timeout() {
    return ApiException(
      message: 'Request timeout. Please try again.',
    );
  }

  /// Unknown error
  factory ApiException.unknown() {
    return ApiException(
      message: 'An unknown error occurred.',
    );
  }
}
