import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetVersionFilters, resetVersions, selectVersionFilters, selectVersionsLoading, selectVersionsSearchTerm, setVersionsSearchTerm, updateVersionFilters } from 'state/versions';

import { VERSION_STATES } from 'constants/versionStates';
import { DELETED_STATES } from 'constants/deletedStates';
import { PRERELEASE_STATES } from 'constants/prereleaseStates';
import { REQUIRED_STATES } from 'constants/requiredStates';

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

const FilterVersions = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectVersionsLoading);
  const filters = useSelector(selectVersionFilters);

  const search = useSelector(selectVersionsSearchTerm);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    dispatch(updateVersionFilters({ search: debouncedSearch }))
  }, [debouncedSearch]);

  useEffect(() => () => {
    dispatch(resetVersions());
  }, [])

  const render = () => (
    <Stack block horizontal style={{ justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'end', flexWrap: 'wrap', rowGap: 15 }}>

      <FeatureFlag flag="VERSION_KEYWORD_SEARCH">
        <LabeledInput label="Search">
          <Input
            placeholder="Search Term"
            disabled={loading}
            block={isMobile}
            value={search}
            onChange={(search) => dispatch(setVersionsSearchTerm(search))}
          />
        </LabeledInput>
      </FeatureFlag>

      <LabeledInput label="Shortcut Status">
        <Select
          disabled={loading}
          style={{ width: isMobile ? '100%' : undefined }}
          value={filters.state}
          onChange={(state) => dispatch(updateVersionFilters({ state }))}
          options={VERSION_STATES}
        />
      </LabeledInput>

      <LabeledInput label="Deleted Items">
        <Select
          disabled={loading}
          block={isMobile}
          style={{ width: isMobile ? '100%' : undefined }}
          value={filters.deleted}
          placeholder="Deleted"
          onChange={(deleted) => dispatch(updateVersionFilters({ deleted }))}
          options={DELETED_STATES}
        />
      </LabeledInput>

      <LabeledInput label="Pre-Release">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.prerelease}
          placeholder="Pre-Release"
          onChange={(prerelease) => dispatch(updateVersionFilters({ prerelease }))}
          options={PRERELEASE_STATES}
        />
      </LabeledInput>

      <LabeledInput label="Required Updates">
        <Select
          disabled={loading}
          block={isMobile}
          value={filters.required}
          placeholder="Required Updates"
          onChange={(required) => dispatch(updateVersionFilters({ required }))}
          options={REQUIRED_STATES}
        />
      </LabeledInput>

      <LabeledInput>
        <Button
          block
          onClick={() => dispatch(resetVersionFilters())} color={Button.Colors.White}
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

export default FilterVersions;