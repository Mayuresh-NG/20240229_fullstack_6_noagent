interface Property {
    _id?: string;
    trade_type: string;
    owner_user_name: string;
    owner: string;
    rent_price?: number;
    prop_price?: number;
    bhk_type: string;
    built_Up_area?: string;
    state?: string;
    // Add this property to track visibility of owner details
    showOwnerDetails: boolean;
    Address: {
        street_name: string;
        city: string;
        Landmark: string;
        pincode: number;
    };
    Furnished: {
        full: boolean;
        semi: boolean;
        none: boolean;
    };
    preferred_tenents: {
        family: boolean;
        Company: boolean;
        B_male: boolean;
        B_female: boolean;
    };
    images: {
        url: string;
        format: string;
    }[];
    Availability_data: Date;
    deposit?: number;
    property_type?: string;
    amenities: string[];
    posted_on?: Date;
    status: string;
    likes?: number;
}


interface User {
    username: string;
    full_name: string;
    email: string;
    phone_number: number;
    password: string;
    user_type: "user" | "admin";
    avatar?: string; // Optional because it's not marked as required in the schema
    date_of_joining?: Date; // Optional because it has a default value
    token?: string; // Optional because it has a default value
}

interface Wishlist {
   _id?: string; // Optional, as it's automatically generated by MongoDB
   userId: string | User; // Can be a string (ObjectId) or a User document, depending on usage
   propertyIds: Array<string | Property>; // An array that can contain strings (ObjectIds) or Property documents
}  
export {Property, User, Wishlist};
