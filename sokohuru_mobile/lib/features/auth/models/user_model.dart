import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_model.freezed.dart';
part 'user_model.g.dart';

/// User roles in Sokohuru
enum UserRole {
  @JsonValue('creator')
  creator,
  @JsonValue('brand')
  brand,
}

/// User model representing authenticated user
@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String email,
    required UserRole role,
    String? fullName,
    String? avatarUrl,
    String? phoneNumber,
    DateTime? createdAt,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}

/// Extension to get display name
extension UserModelX on UserModel {
  String get displayName => fullName ?? email.split('@').first;
}
