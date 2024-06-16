class HouseModel {
    id: number;
    title: string;
    landLord?: string;
    description?: string;
    viewingSlots?: number;
    viewingSlotsAvailable?: number;
    category?: string;
    img?: string;

    constructor (id: number, title: string, landLord: string, description: string, 
        viewingSlots: number, viewingSlotsAvailable: number, category: string, img: string) {
            this.id = id;
            this.title = title;
            this.landLord = landLord;
            this.description = description;
            this.viewingSlots = viewingSlots;
            this.viewingSlotsAvailable = viewingSlotsAvailable;
            this.category = category;
            this.img = img;
    }
}

export default HouseModel;