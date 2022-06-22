import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// material-ui
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from '../Dot';

function createData(trackingNo, name, fat, carbs, protein) {
  return { trackingNo, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(99000000, 'Chair', 100, 0, 14001),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'trackingNo',
    align: 'left',
    disablePadding: false,
    label: 'Tracking No.',
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Customer Name',
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Total Order',
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status',
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount',
  },
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string,
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number,
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  
   let navigate = useNavigate();
  useEffect(() => {
    fetchItems();
  },[]);
  const [items, setItems] = useState([]);
  const SendMail = async(user)=>{
    console.log(user);
      const data = await fetch(
        `http://127.0.0.1:7777/user/?user=${user}`
      );
      //  const items = await data.json(data);
      ///console.log('Res' + data);
      navigate('/');
  } 
  const Approve =async(tid)=>{
     const data = await fetch(`/status?tid=${tid} `);
     
  }
  const fetchItems = async () => {
    const data = await fetch('/DashData');
    const items = await data.json(data);
    setItems(items);
    //console.log(items);
  };

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' },
        }}
      >
        <Table
          aria-labelledby='tableTitle'
          sx={{
            '& .MuiTableCell-root:first-child': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(items, getComparator(order, orderBy)).map(
              (row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;
                console.log(row.status)
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                  >
                    <TableCell
                      component='th'
                      id={row._id}
                      scope='row'
                      align='left'
                    >
                      {row._id}
                    </TableCell>
                    <TableCell align='left'>
                      {row.FNAME} {row.LNAME}
                    </TableCell>
                    <TableCell align='right'>{row.COUNT}</TableCell>
                    <TableCell align='left'>
                      <OrderStatus status={parseInt(row.status)} />
                    </TableCell>
                    <TableCell align='right'>
                      <NumberFormat
                        value={row.PRICE}
                        displayType='text'
                        thousandSeparator
                        prefix='₹'
                      />
                    </TableCell>
                    <TableCell align='left'>
                      <Button
                        type='primary'
                        onClick={() => {
                          Approve(row._id);
                        }}
                      >
                        Approve Order
                      </Button>
                    </TableCell>
                    <TableCell align='left'>
                      <Button
                        type='primary'
                        onClick={() => {
                          console.log(row);
                          SendMail(row.EMAIL);
                        }}
                      >
                        Send Mail
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
