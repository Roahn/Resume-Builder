import React, { Link } from 'react';
import '../AddEg.css';
export default function AddEggs() {
  // const [count, setCount] = React.useState(0);

  /*function handleClick(){
    setCount(count + 1);
  } 

  function handleClick2(){
    setCount(count - 1);
  } */

  return (
    <div class='wrapper'>
      <div class='container'>
        <form action=''>
          <h1>
            <i class='fas fa-shipping-fast'></i>
            Shipping Details
          </h1>
          <div class='name'>
            <div>
              <label for='f-name'>First</label>
              <input type='text' name='f-name' />
            </div>
            <div>
              <label for='l-name'>Last</label>
              <input type='text' name='l-name' />
            </div>
          </div>
          <div class='street'>
            <label for='name'>Street</label>
            <input type='text' name='address' />
          </div>
          <div class='address-info'>
            <div>
              <label for='city'>City</label>
              <input type='text' name='city' />
            </div>
            <div>
              <label for='state'>State</label>
              <input type='text' name='state' />
            </div>
            <div>
              <label for='zip'>Zip</label>
              <input type='text' name='zip' />
            </div>
          </div>
          <h1>
            <i class='far fa-credit-card'></i> Payment Information
          </h1>
          <div class='cc-num'>
            <label for='card-num'>Credit Card No.</label>
            <input type='text' name='card-num' />
          </div>
          <div class='cc-info'>
            <div>
              <label for='card-num'>Exp</label>
              <input type='text' name='expire' />
            </div>
            <div>
              <label for='card-num'>CVV</label>
              <input type='text' name='security' />
            </div>
          </div>
          <div class='btns'>
            <button>Purchase</button>
            <button>Back to cart</button>
          </div>
        </form>
      </div>
    </div>
  );
}
