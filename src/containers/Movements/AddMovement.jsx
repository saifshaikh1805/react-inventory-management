import React from 'react';
import { connect } from 'react-redux';
import { Button, Dropdown, Form, Grid, Header, Input, List, Message, Segment, Transition } from 'semantic-ui-react';
import fire from '../../firebaseConfig';
import { getMovements } from '../../myFunctions';
import { dispatchAction } from '../../redux/all';
import { movementActions } from '../../redux/movementsLocations';
import { prodActions } from '../../redux/products';

class AddMovement extends React.Component {
    handleProdChanged = (event, data) => {
        let id = data.value;
        let name = event.target.textContent.split(' - ')[1];
        dispatchAction(prodActions.SET_SELECTED, Object.assign({}, { id, name }));
    }

    saveMovement = async () => {
        dispatchAction(movementActions.SAVING_MOVEMENT, true);
        let prodId = this.props.products.selectedProd.id;
        let fromLoc = this.props.movementsLocations.fromLoc;
        let toLoc = this.props.movementsLocations.toLoc;
        await getMovements();
        let isVaild = true;
        let errs = [];
        if (prodId === '') {
            isVaild = false;
            errs.push("Product field can't empty");
        }
        if (fromLoc === '' && toLoc === '') {
            isVaild = false;
            errs.push("Please select at least one of these - 'From Location' or 'To Location'");
        }
        if (fromLoc !== '' && toLoc === '') {
            let availableQty = this.props.products.selectedProd.qty.find(x => x.locId === fromLoc).qty;
            if (this.props.movementsLocations.inputQty > availableQty) {
                isVaild = false;
                errs.push("Sorry, only " + availableQty + " units of " + this.props.products.selectedProd.id + " are available at " + fromLoc);
            }
        }
        if (fromLoc !== '' && toLoc !== '') {
            let availableQty = this.props.products.selectedProd.qty.find(x => x.locId === fromLoc).qty;
            if (this.props.movementsLocations.inputQty > availableQty) {
                isVaild = false;
                errs.push("Sorry, only " + availableQty + " units of " + this.props.products.selectedProd.id + " are available at " + fromLoc);
            }
        }
        if (!isVaild) {
            dispatchAction(movementActions.SET_ERRS, errs);
            dispatchAction(movementActions.SAVING_MOVEMENT, false);
        }
        else {
            let mId = Date.now().toString();
            if(this.props.movementsLocations.movementsMode === 'edit')
                mId = this.props.movementsLocations.mId;
            let doc = await fire.firestore().collection('productMovements').doc(mId).set({
                prod_id: this.props.products.selectedProd.id,
                from_loc: fromLoc,
                to_loc: toLoc,
                qty: this.props.movementsLocations.inputQty,
                ts: new Date()
            });
            dispatchAction(movementActions.RESET, '');
            //dispatchAction(prodActions.RESET_SELECTED, '');
            dispatchAction(movementActions.SAVING_MOVEMENT, false);
            this.props.history.push('/products/view');
        }
    }

    handleFromLocationChanged = (event, data) => {
        dispatchAction(movementActions.SET_ERRS, []);
        dispatchAction(movementActions.SET_FROM_LOC, data.value);
    }
    handleToLocationChanged = (event, data) => {
        dispatchAction(movementActions.SET_ERRS, []);
        dispatchAction(movementActions.SET_TO_LOC, data.value);
    }

    handleInputQtyChange = (event, data) => {
        dispatchAction(movementActions.SET_ERRS, []);
        dispatchAction(movementActions.SET_INPUT_QTY, data.value);
    }

    componentDidMount() {
        //getProdsAndLocations();
    }

    componentWillUnmount() {
        dispatchAction(movementActions.SET_FROM_LOC, '');
        dispatchAction(movementActions.SET_TO_LOC, '');
        dispatchAction(movementActions.SET_INPUT_QTY, 1);
        dispatchAction(movementActions.SET_MOVEMENTS_MODE, 'add');
        dispatchAction(movementActions.SET_MOVEMENT_ID, '');
    }

    render() {
        const mode = this.props.movementsLocations.movementsMode;
        const locationsDropdownOptions = this.props.movementsLocations.locations.map(i => { return { key: i.id, value: i.id, text: i.id + ' - ' + i.name } });
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={5}>
                        <Segment raised>
                            <Header as='h2'>{mode === 'edit' ? 'Edit Movement' : 'New Movement'}</Header>
                            <Form>
                                 <Form.Field>
                                    <label>Id</label>
                                    {
                                        mode === 'edit' ?
                                        <div>{this.props.movementsLocations.mId}</div>
                                        :
                                        <Input placeholder='Will be auto generated' value=''></Input>
                                    }
                                </Form.Field>
                                <Form.Field>
                                    <label>Product</label>
                                    <Dropdown
                                        placeholder='Select Product'
                                        fluid
                                        search
                                        selection
                                        options={this.props.products.items.map(i => { return { key: i.id, value: i.id, text: i.id + ' - ' + i.name } })}
                                        value={this.props.products.selectedProd.id}
                                        onChange={(e, d) => { this.handleProdChanged(e, d); }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>From</label>
                                    <Dropdown
                                        placeholder='From Location'
                                        fluid
                                        search
                                        selection
                                        options={[{ key: '0', value: '', text: 'From Location' }].concat(locationsDropdownOptions)}
                                        value={this.props.movementsLocations.fromLoc}
                                        onChange={(e, d) => { this.handleFromLocationChanged(e, d) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>To</label>
                                    <Dropdown
                                        placeholder='To Location'
                                        fluid
                                        search
                                        selection
                                        options={[{ key: '0', value: '', text: 'To Location' }].concat(locationsDropdownOptions)}
                                        value={this.props.movementsLocations.toLoc}
                                        onChange={(e, d) => { this.handleToLocationChanged(e, d) }}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Qty</label>
                                    <Input placeholder='Quantity' type='number' min={1} value={this.props.movementsLocations.inputQty} onChange={(e, d) => { this.handleInputQtyChange(e, d) }}></Input>
                                </Form.Field>
                                <Button loading={this.props.movementsLocations.savingMovement} type='button' primary onClick={this.saveMovement}>Save</Button>
                            </Form>
                        </Segment>
                        <Transition animation='fade' duration={500} visible={this.props.movementsLocations.errs.length > 0}>
                            <Message negative>
                                <Message.Header>Something's not right...</Message.Header>
                                <List bulleted>
                                    {
                                        this.props.movementsLocations.errs.map((i, ind) => {
                                            return (
                                                <List.Item key={ind}>{i}</List.Item>
                                            )
                                        })
                                    }
                                </List>
                            </Message>
                        </Transition>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products,
        movementsLocations: state.movementsLocations
    }
}

export default connect(mapStateToProps)(AddMovement);