import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Button, Collapse, CardBody, Card } from 'reactstrap';
import MaterialTable from 'material-table'
import * as action from '../redux/action.creators'

const Coords = () => {
  const [isOpenCoords, setIsOpenCoords] = useState(false)
  
  const handleToggleCoords = () => setIsOpenCoords(!isOpenCoords)
  const data = useSelector(state => state.coordsReducer.actualCoords.map(el => ({'id': el.id, 'xCoordinate': el._lngLat.lng, 'yCoordinate': el._lngLat.lat})))
  const dispatch = useDispatch()

    return (
        <>
        <Button color="warning" onClick={handleToggleCoords} style={{ marginBottom: '1rem', display: 'block' }}>{isOpenCoords? 'Hidden coordinates' : 'Show coordinates'}</Button>
         <Collapse isOpen={isOpenCoords}>
            <Card>
              <CardBody>
                <div style={{ maxWidth: '100%', BackgroundColor: 'black' }}>
                  <MaterialTable
                    options={{
                      search: false
                    }}
                    actions={[
                      {
                        icon: 'delete',
                        tooltip: 'Delete marker',
                        onClick: (_, rowData) => {
                          dispatch(action.removeCoords(rowData.id))
                        }
                      }
                  ]}
                    columns={[
                      { title: 'ID', field: 'id', type: 'numeric' },
                      { title: 'X', field: 'xCoordinate', type: 'numeric'},
                      { title: 'Y', field: 'yCoordinate', type: 'numeric' },
                    ]}
                    data={data}
                    title="Co-ordinates"
                  />
                  
                </div>
              </CardBody>
            </Card>
          </Collapse>
          </>
    );
}

export default Coords;