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

export { Property };
