export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_user_profile: {
        Row: {
          user_avatar_url: string | null
          user_class_year: Database["public"]["Enums"]["class_year"]
          user_display_name: string
          user_email_address: string
          user_onboarding_complete: boolean | null
          user_uuid: string
        }
        Insert: {
          user_avatar_url?: string | null
          user_class_year: Database["public"]["Enums"]["class_year"]
          user_display_name: string
          user_email_address: string
          user_onboarding_complete?: boolean | null
          user_uuid: string
        }
        Update: {
          user_avatar_url?: string | null
          user_class_year?: Database["public"]["Enums"]["class_year"]
          user_display_name?: string
          user_email_address?: string
          user_onboarding_complete?: boolean | null
          user_uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      class_year:
        | "middle_school"
        | "high_school"
        | "freshman"
        | "sophmore"
        | "junior"
        | "senior"
        | "graduate"
        | "post_graduate"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}