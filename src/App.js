import React, { Component } from 'react';
import './App.css';
import Form from './form';
import Button from './button';
import Algorithm from './algorithm';

class App extends Component {
    state = {
        question: '',
        answer: '',
    }
    onChange = (e) => {
        const res = Algorithm(e.target.value);
        this.setState({
            question: e.target.value,
            answer: res.toString(),
        });
    }
    onClick = (symbol) => {
        this.setState({
            question: (this.state.question + symbol).toString(),
        });
    }
    back = (symbol) => {
        console.log(symbol);
        this.state.question = this.state.question.slice(0,
                                                        this.state.question.length - 1);
        this.setState({
            question: this.state.question,
        });
    }
    render() {
        this.state.answer = Algorithm(this.state.question);
        console.log("just called algorithm")
        return (
            <div className="calculator">
                <div className="header">
                    <p>CASIO</p>
                </div>
                <Form onChange={this.onChange} value={this.state.question} />
                <p className="answer">
                    {this.state.answer}
                </p>
                <Button class="button zero" onClick={this.onClick} symbol="0" />
                <Button class="button one" onClick={this.onClick} symbol="1" />
                <Button class="button two" onClick={this.onClick} symbol="2" />
                <Button class="button three" onClick={this.onClick} symbol="3" />
                <Button class="button four" onClick={this.onClick} symbol="4" />
                <Button class="button five" onClick={this.onClick} symbol="5" />
                <Button class="button six" onClick={this.onClick} symbol="6" />
                <Button class="button seven" onClick={this.onClick} symbol="7" />
                <Button class="button eight" onClick={this.onClick} symbol="8" />
                <Button class="button nine" onClick={this.onClick} symbol="9" />
                <Button class="button addition" onClick={this.onClick} symbol="+" />
                <Button class="button subtraction" onClick={this.onClick} symbol="-" />
                <Button class="button division" onClick={this.onClick} symbol="/" />
                <Button class="button multiplication" onClick={this.onClick} symbol="*" />
                <Button class="button decimal" onClick={this.onClick} symbol="." />
                <Button class="button back" onClick={this.back} symbol="del" />

            </div>
        );
    }
}

export default App;
