import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetShortcutFilters, selectShortcutFilters, selectShortcutsLoading, selectShortcutsSearchTerm, setShortcutsSearchTerm, updateShortcutFilters } from 'state/shortcuts';

import { SHORTCUT_STATES } from 'constants/shortcutStates';
import { DELETED_STATES } from 'constants/deletedStates';

import Stack from 'components/Stack';
import Select from 'components/Select';
import LabeledInput from 'components/LabeledInput';
import Collapse from 'components/Collapse';
import Button from 'components/Button';
import MobileSwap from 'components/MobileSwap';
import Input from 'components/Input';
import FeatureFlag from 'components/FeatureFlag';

import { isMobile } from 'lib/config';
import { useDebounce } from 'lib/util';

const FilterShortcuts = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectShortcutsLoading);
  const filters = useSelector(selectShortcutFilters);

  const search = useSelector(selectShortcutsSearchTerm);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(updateShortcutFilters({ search: debouncedSearch }))
  }, [debouncedSearch]);

  const render = () => (
    <Stack block horizontal style={{ justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'end', flexWrap: 'wrap', rowGap: 15 }}>
      <FeatureFlag flag="SHORTCUT_KEYWORD_SEARCH">
        <LabeledInput label="Search">
          <Input
            placeholder="Search Term"
            disabled={loading}
            block={isMobile}
            value={search}
            onChange={(search) => dispatch(setShortcutsSearchTerm(search))}
          />
        </LabeledInput>
      </FeatureFlag>

      <LabeledInput label="Shortcut Status">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.state}
          onChange={(state) => dispatch(updateShortcutFilters({ state }))}
          options={SHORTCUT_STATES}
        />
      </LabeledInput>

      <LabeledInput label="Deleted Items">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.deleted}
          placeholder="Deleted"
          onChange={(deleted) => dispatch(updateShortcutFilters({ deleted }))}
          options={DELETED_STATES}
        />
      </LabeledInput>

      <LabeledInput>
        <Button
          block
          onClick={() => dispatch(resetShortcutFilters())}
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

export default FilterShortcuts;