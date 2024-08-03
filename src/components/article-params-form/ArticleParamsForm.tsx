import { useState, FormEvent, useRef } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Text } from '../text';
import clsx from 'clsx';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { useOutsideClickCloseOverlay } from '../select/hooks/useOutsideClickCloseOverlay';

export type ArticleParamsFormProps = {
	setNewArticle: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setNewArticle } = props;
	const formRef = useRef<HTMLDivElement | null>(null);

	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormState((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNewArticle(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		setNewArticle(defaultArticleState);
	};

	useOutsideClickCloseOverlay({
		optionRef: formRef,
		onChange: () => setIsMenuOpen(false),
		state: isMenuOpen,
	});

	return (
		<>
			<ArrowButton
				isActive={isMenuOpen}
				onClick={() => setIsMenuOpen((currentIsOpened) => !currentIsOpened)}
			/>
			<div
				onClick={() => setIsMenuOpen(false)}
				className={clsx(styles.overlay, isMenuOpen && styles.overlay_open)}
			></div>
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}
				ref={formRef}
			>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}
				>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
