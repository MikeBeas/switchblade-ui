import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DELETED_STATES } from 'constants/deletedStates';

import Stack from 'components/Stack';
import Select from 'components/Select';
import LabeledInput from 'components/LabeledInput';
import Collapse from 'components/Collapse';
import Button from 'components/Button';
import MobileSwap from 'components/MobileSwap';
import Input from 'components/Input';

import { isMobile } from 'lib/config';
import { useDebounce } from 'lib/util';
import { resetUserFilters, selectUserFilters, selectUsersLoading, selectUsersSearchTerm, setUsersSearchTerm, updateUserFilters } from 'state/users';

const FilterUsers = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectUsersLoading);
  const filters = useSelector(selectUserFilters);

  const search = useSelector(selectUsersSearchTerm);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(updateUserFilters({ search: debouncedSearch }))
  }, [debouncedSearch]);

  const render = () => (
    <Stack block horizontal style={{ justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'end', flexWrap: 'wrap', rowGap: 15 }}>
      <LabeledInput label="Search">
        <Input
          placeholder="Search Term"
          disabled={loading}
          block={isMobile}
          value={search}
          onChange={(newSearch) => dispatch(setUsersSearchTerm(newSearch))}
        />
      </LabeledInput>

      <LabeledInput label="Deleted Users">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.deleted}
          placeholder="Deleted"
          onChange={(deleted) => dispatch(updateUserFilters({ deleted }))}
          options={DELETED_STATES}
        />
      </LabeledInput>

      <LabeledInput>
        <Button
          block
          onClick={() => dispatch(resetUserFilters())}
          color={Button.Colors.White}
          disabled={loading}
        >
          Reset Filters
        </Button>
      </LabeledInput>
    </Stack>
  )

  return (
    <MobileSwap
      desktop={render}
      mobile={() => <Collapse title="Filters">{render()}</Collapse>}
    />
  )
}

export default FilterUsers;