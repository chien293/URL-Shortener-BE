interface UrlResponse {
    long_url: string;
    short_url?: string;
    expiry_date: Date;
    custom_code: string;
  }
  
  export default UrlResponse;