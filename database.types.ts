export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      vigil_alerts: {
        Row: {
          channel: string
          id: number
          incident_id: number
          payload: Json | null
          sent_at: string | null
          status: string | null
        }
        Insert: {
          channel: string
          id?: number
          incident_id: number
          payload?: Json | null
          sent_at?: string | null
          status?: string | null
        }
        Update: {
          channel?: string
          id?: number
          incident_id?: number
          payload?: Json | null
          sent_at?: string | null
          status?: string | null
        }
      }
      vigil_incidents: {
        Row: {
          console_logs: Json | null
          created_at: string | null
          failure_reason: string | null
          failure_step: string | null
          id: number
          incident_type: string
          network_errors: Json | null
          region: string | null
          resolved_at: string | null
          screenshot_blurred_url: string | null
          screenshot_full_url: string | null
          session_id: string | null
          site_id: number
          transaction_id: number | null
        }
        Insert: {
          console_logs?: Json | null
          created_at?: string | null
          failure_reason?: string | null
          failure_step?: string | null
          id?: number
          incident_type: string
          network_errors?: Json | null
          region?: string | null
          resolved_at?: string | null
          screenshot_blurred_url?: string | null
          screenshot_full_url?: string | null
          session_id?: string | null
          site_id: number
          transaction_id?: number | null
        }
        Update: {
          console_logs?: Json | null
          created_at?: string | null
          failure_reason?: string | null
          failure_step?: string | null
          id?: number
          incident_type?: string
          network_errors?: Json | null
          region?: string | null
          resolved_at?: string | null
          screenshot_blurred_url?: string | null
          screenshot_full_url?: string | null
          session_id?: string | null
          site_id?: number
          transaction_id?: number | null
        }
      }
      vigil_page_checks: {
        Row: {
          checked_at: string | null
          error: string | null
          id: number
          load_time_ms: number | null
          region: string | null
          site_id: number
          status_code: number | null
          url: string
        }
        Insert: {
          checked_at?: string | null
          error?: string | null
          id?: number
          load_time_ms?: number | null
          region?: string | null
          site_id: number
          status_code?: number | null
          url: string
        }
        Update: {
          checked_at?: string | null
          error?: string | null
          id?: number
          load_time_ms?: number | null
          region?: string | null
          site_id?: number
          status_code?: number | null
          url?: string
        }
      }
      vigil_sites: {
        Row: {
          config: Json | null
          created_at: string | null
          id: number
          name: string
          project_id: number | null
          updated_at: string | null
          url: string
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: number
          name: string
          project_id?: number | null
          updated_at?: string | null
          url: string
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: number
          name?: string
          project_id?: number | null
          updated_at?: string | null
          url?: string
        }
      }
      vigil_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          id: number
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier: string
          updated_at: string | null
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          id?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          updated_at?: string | null
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          id?: number
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier?: string
          updated_at?: string | null
          user_id?: number | null
        }
      }
      vigil_transaction_runs: {
        Row: {
          duration_ms: number | null
          failure_reason: string | null
          failure_step: string | null
          id: number
          incident_id: number | null
          ran_at: string | null
          region: string | null
          status: string
          transaction_id: number
        }
        Insert: {
          duration_ms?: number | null
          failure_reason?: string | null
          failure_step?: string | null
          id?: number
          incident_id?: number | null
          ran_at?: string | null
          region?: string | null
          status: string
          transaction_id: number
        }
        Update: {
          duration_ms?: number | null
          failure_reason?: string | null
          failure_step?: string | null
          id?: number
          incident_id?: number | null
          ran_at?: string | null
          region?: string | null
          status?: string
          transaction_id?: number
        }
      }
      vigil_transactions: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: number
          name: string
          regions: string[] | null
          schedule: string | null
          site_id: number
          steps: Json
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: number
          name: string
          regions?: string[] | null
          schedule?: string | null
          site_id: number
          steps: Json
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: number
          name?: string
          regions?: string[] | null
          schedule?: string | null
          site_id?: number
          steps?: Json
          updated_at?: string | null
        }
      }
    }
  }
}
