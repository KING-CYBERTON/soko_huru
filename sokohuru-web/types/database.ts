/**
 * GENERATED FILE — DO NOT EDIT MANUALLY
 *
 * Run `npm run types` to regenerate this file from your Supabase schema
 *
 * This command will connect to your Supabase project and generate
 * TypeScript types based on your database schema.
 *
 * Example: npm run types
 */

export type Database = {
  public: {
    Tables: {
      user_roles: {
        Row: {
          id: string;
          role: 'creator' | 'brand';
          created_at: string;
        };
        Insert: {
          id: string;
          role: 'creator' | 'brand';
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: 'creator' | 'brand';
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
