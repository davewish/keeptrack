export class Project {
  id: number | undefined;

  name: string = '';
  descripton: string = '';
  imageUrl: string = '';
  contractTypeId: number | undefined;
  contactSignOn: Date = new Date();
  budget: number = 0;
  isActive: boolean = false;

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initialize: any) {
    if (!initialize) return;
    if (initialize.id) this.id = initialize.id;
    if (initialize.name) this.name = initialize.name;
    if (initialize.descripton) this.descripton = initialize.descripton;
    if (initialize.imageUrl) this.imageUrl = initialize.imageUrl;
    if (initialize.contractTypeId)
      this.contractTypeId = initialize.contractTypeId;
    if (initialize.contactSignOn)
      this.contactSignOn = new Date(initialize.contactSignOn);
    if (initialize.budget) this.budget = initialize.budget;
    if (initialize.isActive) this.isActive = initialize.isActive;
  }
}
