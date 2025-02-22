export class GridSettings {
    rowsCount;
    columnsCount;
    constructor(field) {
        this.rowsCount = field.rows;
        this.columnsCount = field.cols;
    }
}