// src/utils/BookingGuard.js

export const BookingGuard = {
  // ہر سروس کے لیے مخصوص ریکوائرمنٹس
  getRequirements: (serviceType, orderValue = 0) => {
    const baseFields = ["phone_verified", "emergency_contact"];

    switch (serviceType) {
      case 'RIDE':
        return {
          fields: [...baseFields, "live_location", "selfie_auth"],
          payment: orderValue > 10000 ? "WALLET_HOLD" : "FLEXIBLE",
          securityLevel: 2
        };

      case 'FOOD':
      case 'SHOP':
        return {
          fields: [...baseFields, "full_address", "receiver_phone"],
          payment: orderValue > 5000 ? "PARTIAL_ADVANCE" : "COD_SUPPORTED",
          securityLevel: 1
        };

      case 'HOTEL':
        return {
          fields: [...baseFields, "cnic_passport", "guest_count", "check_in_out"],
          payment: "FULL_ADVANCE_OR_HOLD",
          securityLevel: 2
        };

      case 'FUNCTION_HALL':
        return {
          fields: [...baseFields, "organizer_cnic", "event_date", "guest_capacity", "liability_agreement"],
          payment: "50_PERCENT_MANDATORY",
          securityLevel: 3 // High Security
        };

      case 'PARCEL':
        return {
          fields: [...baseFields, "receiver_details", "parcel_value_declaration"],
          payment: "PREPAID_OR_COD",
          securityLevel: 1
        };

      default:
        return { fields: baseFields, payment: "CASH", securityLevel: 0 };
    }
  }
};
