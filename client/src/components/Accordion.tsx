import React, { ReactChild } from 'react'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import { IoIosArrowUp } from 'react-icons/io'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'

interface IAccordion {
  title: string
  children: ReactChild
}

const StyledAccordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  // border: `1px solid ${theme.palette.divider}`,
  background: 'transparent',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<IoIosArrowUp color='#524EED' fontSize={23} />} {...props} />
))(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  padding: '0 15px',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '10px',
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const Accordion: React.FC<IAccordion> = ({ title, children }) => {
  const [expanded, setExpanded] = React.useState<boolean>(true)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  return (
    <div>
      <StyledAccordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Typography variant='body2' sx={{ color: '#524EED', fontWeight: 600, textTransform: 'uppercase' }}>
            {title}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ background: '#524EED', padding: '3px', borderRadius: '5px', marginRight: '15px' }}>
              <BiSearch />
            </span>
            <span style={{ background: '#524EED', padding: '3px', borderRadius: '5px' }}>
              <AiOutlinePlus />
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </StyledAccordion>
    </div>
  )
}

export default Accordion
