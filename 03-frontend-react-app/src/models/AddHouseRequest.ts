class AddHouseRequest {
    title: string;
    landLord: string;
    description: string;
    viewingSlots: number;
    category: string;
    img?: string;

    constructor(title: string, landLord: string, description: string, viewingSlots: number, 
        category: string) {
            this.title = title;
            this.landLord = landLord;
            this.description = description;
            this.viewingSlots = viewingSlots;
            this.category = category;
        }
}

export default AddHouseRequest;