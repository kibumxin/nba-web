import React from 'react';
import {ShotChart} from './ShotChart';
import {CountSlider} from './CountSlider';
import { Radio, Col, Row, Switch} from 'antd';
import _ from 'lodash';

const RadioGroup = Radio.Group;




export class DataViewContainer extends React.Component {
    state = {
        minCount: 2,
        chartType: "hexbin",
        displayTooltips: true,
    }
    onCountSliderChange = (count) => {
        this.setState({minCount: count});
    }
    onChartTypeChange = (e) => {
        this.setState({chartType: e.target.value});
    }
    onTooltipChange = (displayTooltips) => {
        this.setState({displayTooltips});
    }


    render() {
        return (
            <div className="data-view">
                <ShotChart
                    playerId={this.props.playerId}
                    minCount={this.state.minCount}
                    charType={this.state.chartType}
                    displayToolTips={this.state.displayTooltips}
                />
                <div className="filters">
                    {this.state.chartType === "hexbin" ?
                        <CountSlider onCountSliderChange = {_.debounce(this.onCountSliderChange, 500)}/> : null}
                    <br/>
                    <Row>
                        <Col span={12} offset="2">
                            <RadioGroup onChange={this.onChartTypeChange} value={this.state.chartType}>
                                <Radio value="hexbin">Hexbin</Radio>
                                <Radio value="scatter">Scatter</Radio>
                            </RadioGroup>
                        </Col>
                        <Col span={6}>
                            <Switch checkedChildren="On"
                                    unCheckedChildren="Off"
                                    defaultChecked
                                    onChange={this.onTooltipChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}