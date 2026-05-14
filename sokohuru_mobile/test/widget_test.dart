import 'package:flutter_test/flutter_test.dart';
import 'package:sokohuru_mobile/main.dart';

void main() {
  testWidgets('App launches successfully', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const SokohuruApp());

    // Verify that the app title is displayed.
    expect(find.text('Sokohuru Mobile'), findsOneWidget);
  });
}
